
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';

import Header from '../Header/Header';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import Register from '../Register/Register';
import Login from '../Login/Login';
import ActivationPage from '../../utils/ActivationPage';
import Profile from '../Profile/Profile';
import MyOrders from '../MyOrders/MyOrders';
import MyAddress from '../MyAddress/MyAddress';
import MyCoupons from '../MyCoupons/MyCoupons';

import Dishes from '../Dishes/Dishes';
import PopupDish from '../PopupDish/PopupDish';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import Rolls from '../Rolls/Rolls';
import Backed from '../Backed/Backed';
import Futomaki from '../Futomaki/Futomaki';
import Handrolls from '../Handrolls/Handrolls';
import Maki from '../Maki/Maki';
import Sandochi from '../Sandochi/Sandochi';
import Sushi from '../Sushi/Sushi';
import Soups from '../Soups/Soups';
import Tempura from '../Tempura/Tempura';
import Woks from '../Woks/Woks';
import Vegan from '../Vegan/Vegan';

import Cart from '../Cart/Cart';
import Delivery from '../Delivery/Delivery';
import CashnCarry from '../CashnCarry/CashnCarry';
import Payment from '../Payment/Payment';

import Promo from '../Promo/Promo';
import Contacts from '../Contact/Contact';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

import MainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/apiAuth';

import Preloader from '../Preloader/Preloader';
import Tooltip from '../UI/Tooltip/Tooltip';

import { CONFLICT_REG, ERR_REGISTER, WRONG_PASS, WRONG_TOKEN, ERR_CHANGE_INFO } from '../../utils/errors';
import './App.css';

import Banner from '../Banner/Banner'; // удалить позже

function App() {

  // location
  const navigate = useNavigate();

  // language state
  const [language, setLanguage] = useState('ru'); //начальный язык

  // users state
  const [currentUser, setCurrentUser] = useState({});

  const [logIn, setLogIn] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [orders, setOrders] = useState([]);

  //const [coupons, setCoupons] = useState([]); нет на бэке

  // Promo news Items state
  const [promoNews, setPromoNews] = useState([]);

  // dishes Items
  const [dishes, setDishesItems] = useState([]);

  // dish Items state
  const [selectedDish, setSelectedDish] = useState({});

  // burger open state
  const [isBurger, setIsBurger] = useState(false);

  // burger header open state
  const [burgerHeader, setBurgerHeader] = useState(false);

   // errors state
  const [errorMessage, setErrorMessage] = useState('');

  // preloader state
  const [isPreloader, setPreloader] = useState(false);

  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState({
    image: '',
    caption: '',
  });


  // functionality -- registration
  function handleRegister(first_name, last_name,  email, phone, password) {
    setPreloader(true);
    apiAuth.auth({ first_name, last_name, email, phone, password })
        .then((res) => {
            if (res !== 400) {
                setCurrentUser(res);
                navigate('/login');
                setPreloader(false);
            }
        }).catch(err => {
            if (err === 'Ошибка: 409') {
                setErrorMessage(CONFLICT_REG);
            } else {
                setErrorMessage(ERR_REGISTER);
            }
            console.log(err);
            setPreloader(false);
    });
  }
  //end

  // functionality -- login
  function handleLogin(email, password) {
    setPreloader(true);
    apiAuth.login({ email, password })
        .then((res) => {
            if(res) { 
                localStorage.setItem('logInJwt', res.access);
                localStorage.setItem('logInJwtRefresh', res.refresh);
                handleTokenCheck();
                setLogIn(true);
                navigate('/profile');
                setPreloader(false);
            }
        }).catch(err => {
            if (err === 'Ошибка: 401') {
                setErrorMessage(WRONG_PASS);
                setLogIn(false);
            } else {
                setErrorMessage(WRONG_TOKEN);
            }
            console.log(err);
            setPreloader(false);
        });
  }
  //end

  // functionality -- update user info
  function handleUpdateProfile(first_name, last_name, email, phone, date_of_birth,
    messenger) {
      setPreloader(true);
        MainApi.changeUserInformation({ first_name, last_name, email, phone, date_of_birth,
          messenger })
        .then((res) => {
            setCurrentUser(res);
            setErrorMessage('Ваши данные успешно изменены');
            setPreloader(false);
        }).catch(err => {
            if (err === 'Ошибка: 409') {
                setErrorMessage(CONFLICT_REG);
            } else {
                setErrorMessage(ERR_CHANGE_INFO);
            }
            console.log(err);
            setPreloader(false);
        });
  }
  //end

  // functionality -- getting User Address information
  function getAddressApi() {
    setPreloader(true);
    MainApi.getUserAdress()
        .then((addresses) => {
            setAddresses(addresses);
            localStorage.setItem('addresses', JSON.stringify(addresses));
            setPreloader(false);
          }).catch(err => {
              console.log(err);
              setPreloader(false);
          });
  }
  // end

  // functionality -- update user adress info
  function handlePostUserAddress(newAddress, callback) {
    setPreloader(true);
    const addressExists = addresses.some((addressItem) => addressItem.id === newAddress.id);
    if (addressExists) {
      handleDeleteAddress(newAddress.id);
    } else {
      MainApi.postUserAdress(newAddress)
        .then((savedAddress) => {
          setAddresses((prevAddresses) => {
            const updatedAddresses = [...prevAddresses, savedAddress];
            localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
            return updatedAddresses;
          });
          setPreloader(false);
          if (callback) callback(); // если есть колбэк, вызываем его
        })
        .catch((err) => {
          console.log(err);
          setPreloader(false);
        });
    }
  }
  //end

  // functionality -- update adress - пока не нужно
  /*function handleChangeAdress(city, short_name, full_address, type) {
    setPreloader(true);
    MainApi.changeAdress({ city, short_name, full_address, type })
    .then((res) => {
        setCurrentUser(res);
        setPreloader(false);
    }).catch(err => {
        if (err === 'Ошибка: 409') {
            setErrorMessage(CONFLICT_REG);
        } else {
            setErrorMessage(ERR_REGISTER);
        }
        console.log(err);
        setPreloader(false);
    });
  }*/
  //end

  // functionality -- delete address
  function handleDeleteAddress(id) {
    setPreloader(true);
    MainApi.deleteUserAdress(id)
      .then(() => {
        setAddresses((prevAddresses) => {
          const updatedAddresses = prevAddresses.filter((addressItem) => addressItem.id !== id);
          if (Array.isArray(updatedAddresses)) {
            // updatedAddresses действительно массив, теперь обновляем localStorage
            localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
          }
          localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
          return updatedAddresses;
        });
        setPreloader(false);
      })
      .catch((err) => {
          console.log(err);
          setPreloader(false);
      });
  }

  useEffect(() => {
    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      try {
        const addresses = JSON.parse(storedAddresses);
        setAddresses(addresses);
      } catch (error) {
        console.error('Не удалось разобрать addresses из localStorage:', error);
        // удалить ключ 'addresses', чтобы исключить некорректное чтение в будущем
        localStorage.removeItem('addresses');
      }
    }
  }, []); //пустой массив зависимостей означает, что эффект выполнится один раз при монтировании компонента


  // functionality -- getting User Last Orders
  function getOrdersApi() {
    setPreloader(true);
    MainApi.getUserOrders()
        .then((orders) => {
              setOrders(orders);
              localStorage.setItem('orders', JSON.stringify(orders));
              setPreloader(false);
          }).catch(err => {
              console.log(err);
              setPreloader(false);
          });
  }
  // end

  // functionality -- getting User Coupons нет на бэке
  /*function getCoupons() {
    setPreloader(true);
    MainApi.getUserCoupons()
        .then((coupons) => {
              setCoupons(coupons);
              localStorage.setItem('coupons', JSON.stringify(coupons));
              setPreloader(false);
          }).catch(err => {
              console.log(err);
              setPreloader(false);
          });
  }*/ 
  // end

  // functionality -- getting news from Api
  function getNews() {
    setPreloader(true);
    MainApi.getPromoNews()
    .then((promoNews) => {
          setPromoNews(promoNews);
          setPreloader(false);
      }).catch(err => {
          console.log(err);
          setPreloader(false);
      });
  }
  //end

  // functionality -- getting dishes from Api
  function getDishes() {
    setPreloader(true);
    MainApi.getDishesFromApi()
    .then((dishes) => {
          setDishesItems(dishes);
          localStorage.setItem('dishes', JSON.stringify(dishes));
          setPreloader(false);
      }).catch(err => {
          console.log(err);
          setPreloader(false);
      });
  }
  //end

  // functionality -- clear token and exit
  const handleLogout = () => {
    // Сначала удаляем специфичные для приложения ключи
    localStorage.removeItem('addresses');
    localStorage.removeItem('orders');
    localStorage.removeItem('coupons');
    // Затем удаляем ключи авторизации
    localStorage.removeItem('logInJwt');
    localStorage.removeItem('logInJwtRefresh');
    // А только после - очищаем всё остальное
    window.localStorage.clear();
    setLogIn(false);
    setCurrentUser({});
    navigate('/');
  };
  //end

  // checking token проверка токена
  const handleTokenCheck = useCallback(() => {
    const logInJwt = localStorage.getItem('logInJwt');
    const logInJwtRefresh = localStorage.getItem('logInJwtRefresh');
    if (logInJwt) {
      apiAuth.tokenVerify(logInJwt)
        .then((res) => {
          if (res.status === 401 && logInJwtRefresh) { // apiAuth.tokenVerify при недействительном токене возвращает res.status
            apiAuth.tokenRefresh(logInJwtRefresh)
              .then((res) => {
                localStorage.setItem('logInJwt', res.access);
                localStorage.setItem('logInJwtRefresh', res.refresh);
                setLogIn(true);
                setCurrentUser(res); // Нужно обновить данные пользователя, если они предоставлены в ответе на запрос
              })
              .catch((err) => {
                console.log(err);
                setLogIn(false);
              });
          } else {
            setLogIn(true);
            setCurrentUser(res); // Обновляем данные пользователя
          }
        })
        .catch((err) => {
          console.log(err);
          setLogIn(false);
        });
    } else {
      setLogIn(false);
    }
  }, []);
  //end

  // Проверяю, выполнял ли пользователь вход ранее
    useEffect(() => {
      handleTokenCheck();
    }, [handleTokenCheck]);
    //end

  // useEffect ошибки
      useEffect(() => {
        setErrorMessage('');
    }, [setErrorMessage]);
    //end

    // отрисовка меню, новостей
    useEffect(() => {
      getDishes();
      getNews();
    }, []);
    //end

    useEffect(() => {
        if (logIn) {
            Promise.all([MainApi.getUserId()])
                .then(([userData, orders, addresses]) => {
                    setCurrentUser(userData);
                    getAddressApi(addresses);
                    getOrdersApi(orders);
                   // getCoupons(coupons);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [logIn]);
    //end

    // functionality -- burger
    function handleBurgerMenu() {
      setIsBurger(!isBurger);
    }

    function handleBurgerHeader() {
      setBurgerHeader(!burgerHeader);
    }
    //end

    // popup dish
    function handleDishClick(dish) {
      setSelectedDish(dish);
    }
    //end

    function closePopup() {
      setSelectedDish({});
      setIsBurger(false);
      setBurgerHeader(false);
      setIsTooltipActive(false);
    }
    // end popup

    // Функция закрытия окна на оверлей
    useEffect(() => {
      function handleOverlayClick(evt) {
        if (evt.target.classList.contains("header-burger-menu") || evt.target.classList.contains("burger-menu")
          || evt.target.classList.contains("popup")) {
            closePopup();
        }
      }
      document.addEventListener('mousedown', handleOverlayClick);
      return () => {
        document.removeEventListener('mousedown', handleOverlayClick);
      };
      // eslint-disable-next-line
    }, []);
    //end

    // Функция закрытия окон по esc
    useEffect(() => {
      const closeByEsc = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closePopup();
        }
      };
      document.addEventListener('keydown', closeByEsc);
      return () => document.removeEventListener('keydown', closeByEsc);
      // eslint-disable-next-line
    }, []);
    // end

  return (
    <>

      <CurrentUserContext.Provider value={currentUser}>

      <BurgerMenu 
        isBurger={isBurger} 
        handleBurgerMenu={handleBurgerMenu}
        dishes={dishes}
        language={language}
      />

      <HeaderBurger 
        burgerHeader={burgerHeader} 
        handleBurgerHeader={handleBurgerHeader} 
        language={language} 
        onLanguageChange={setLanguage}  
      />

      <HeaderMenu 
        handleBurgerHeader={handleBurgerHeader} 
      />

        <Header 
          language={language} 
          onLanguageChange={setLanguage}
        />

        <Banner />

        <Preloader isPreloader={isPreloader} />

        <Routes>
          <Route
            path='/registration'
            element={
              <Register
                onRegister={handleRegister}
                errorMessage={errorMessage}
              />}
          />

          <Route 
            path='/activation/:uid/:token'
            element={
              <ActivationPage />}
          />

          <Route 
            path='/login'
            element={
              <Login
                onLogin={handleLogin}
                errorMessage={errorMessage}
              />}
          />

          <Route 
            path='/profile'
            element={
              <ProtectedRoute logIn={logIn}>
                <Profile
                  logIn={logIn}
                  onUpdateProfile={handleUpdateProfile}
                  handleLogout={handleLogout}
                  errorMessage={errorMessage}
                  handleBurgerHeader={handleBurgerHeader}
                />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/profile/orders'
            element={
              <ProtectedRoute logIn={logIn}>
                <MyOrders
                  logIn={logIn}
                  orders={orders}
                />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/profile/adresses'
            element={
                <ProtectedRoute logIn={logIn}>
                  <MyAddress
                    logIn={logIn}
                    addresses={addresses}
                    onDeleteAddress={handleDeleteAddress}
                    onPostAddress={(newAddress, callback) => handlePostUserAddress(newAddress, callback)}
                  />
                </ProtectedRoute>
              }
          />

          <Route 
            path='/profile/coupons'
            element={
              <ProtectedRoute logIn={logIn}>
                <MyCoupons
                  logIn={logIn}
                  //coupons={coupons}
                />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/'
            element={
              <Dishes
                selectedDish={selectedDish}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                dishes={dishes}
                isPreloader={isPreloader}
                handleBurgerHeader={handleBurgerHeader}
                language={language}
              />}
          />

          <Route 
            path='/rolls' 
            element={
              <Rolls
                dishes={dishes}
                language={language}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/futomaki' 
            element={
              <Futomaki
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/backed' 
            element={
              <Backed
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/tempura' 
            element={
              <Tempura
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/sandochi' 
            element={
              <Sandochi
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/handrolls' 
            element={
              <Handrolls
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/maki' 
            element={
              <Maki
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/sushi' 
            element={
              <Sushi
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/woks' 
            element={
              <Woks
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/soups' 
            element={
              <Soups
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/vegan'
            element={
              <Vegan
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                language={language} 
              />} 
          />

          <Route 
            path='/cart' 
            element={<Cart
              dishes={dishes}
            />} 
          />

          <Route 
            path='/delivery' 
            element={<Delivery/>} 
          />

          <Route 
            path='/pickup' 
            element={<CashnCarry/>} 
          />

          <Route 
            path='/payment' 
            element={<Payment/>} 
          />

          <Route 
            path='/contacts'
            element={<Contacts/>}
          />

          <Route 
            path='/promo'
            element={
              <Promo
                promoNews={promoNews}
                language={language}
              />
            }
          />
          
          <Route 
            path='*'
            element={<NotFound/>}
          />
        </Routes>

        <PopupDish
            dish={selectedDish}
            onClose={closePopup}
            language={language}
        />

        <Tooltip
          isTooltipActive={isTooltipActive}
          //onOpenMenu={handleOpenMenu}
          onClose={closePopup}
          caption={isInfoTooltipMessage.caption}
          image={isInfoTooltipMessage.image}
        />
        
        <Footer/>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
