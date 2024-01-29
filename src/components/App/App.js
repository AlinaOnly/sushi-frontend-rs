
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Header from '../Header/Header';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import Dishes from '../Dishes/Dishes';
import PopupDish from '../PopupDish/PopupDish';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import Cart from '../Cart/Cart';
import Delivery from '../Delivery/Delivery';
import CashnCarry from '../CashnCarry/CashnCarry';
import Payment from '../Payment/Payment';

import Register from '../Register/Register';
import Login from '../Login/Login';
import ActivationPage from '../../utils/ActivationPage';
import Profile from '../Profile/Profile';
import MyOrders from '../MyOrders/MyOrders';
import MyAdress from '../MyAdress/MyAdress';
import MyCoupons from '../MyCoupons/MyCoupons';

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

import Promo from '../Promo/Promo';
import Contacts from '../Contact/Contact';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

import MainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/apiAuth';
import Preloader from '../Preloader/Preloader';
import { CONFLICT_REG, ERR_REGISTER, WRONG_PASS, WRONG_TOKEN } from '../../utils/errors';
import './App.css';

/*import { setTranslations, setDefaultLanguage, useTranslation } from 'react-multi-lang'
import pt from 'pt.json';
import en from 'en.json';

// Do this two lines only when setting up the application
setTranslations({pt, en});
setDefaultLanguage('en');*/



function App() {
  //const t = useTranslation();

  // location
  const navigate = useNavigate();

  // users state
  const [currentUser, setCurrentUser] = useState({});
  const [logIn, setLogIn] = useState(false);
  //const [isAdresses, setAddresses] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // Promo news Items state
  const [promoNews, setPromoNews] = useState([]);

  // dishes Items
  const [dishes, setDishesItems] = useState([]);

  // dishes Items state
  const [selectedDish, setSelectedDish] = useState({});

  // burgeropen state
  const [isBurger, setIsBurger] = useState(false);
  // burgeropen state
  const [burgerHeader, setBurgerHeader] = useState(false);

   // errors state
  const [errorMessage, setErrorMessage] = useState('');

  // preloader state
  const [isPreloader, setPreloader] = useState(false);


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
  function handleUpdateProfile(first_name, last_name, phone, email) {
      setPreloader(true);
        MainApi.changeUserInformation({ first_name, last_name, phone, email })
        .then((res) => {
            setCurrentUser(res);
            setErrorMessage('Ваши данные успешно изменены');
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
  }
  //end

  // functionality -- update user adress info
  /*function handlePostUserAdress(city, short_name, full_address, type) {
        MainApi.postUserAdress({ city, short_name, full_address, type })
        .then((res) => {
            setCurrentUser(res);
            setErrorMessage('Ваши данные успешно изменены');
        }).catch(err => {
            if (err === 'Ошибка: 409') {
                setErrorMessage(CONFLICT_REG);
            } else {
                setErrorMessage(''); // не придумала сюда ошибку
            }
            console.log(err);
        });
  }*/

  function handlePostUserAdress(addressData) {
    setPreloader(true);
    MainApi.postUserAdress(addressData)
      .then((addedAddress) => {
        // Добавляем адрес в массив и обновляем состояние и localStorage
        const updatedAddresses = [...addresses, addedAddress];
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setPreloader(false);
      })
      .catch(err => {
        console.log(err);
        setPreloader(false);
      });
  }
  //end

  // functionality -- getting User Adress information
  function getAdressApi() {
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

  // functionality -- update adress
  function handleChangeAdress(city, short_name, full_address, type) {
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
  }
  //end

  // functionality -- delete adress
  function handleDeleteAdress(id) {
    setPreloader(true);
    MainApi.deleteUserAdress(id)
      .then(() => {
        //setAddresses((currentAddresses) => currentAddresses.filter((address) => address.id !== id));
        /*setAddresses((currentAddresses) => {
          const updatedAddresses = currentAddresses.filter((address) => address.id !== id);
          localStorage.setItem('addresses', JSON.stringify(updatedAddresses)); // Используем обновленный массив
          return updatedAddresses;
        });*/
        const updatedAddresses = addresses.filter((address) => address.id !== id);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        //localStorage.setItem('addresses');
        setPreloader(false);
    }).catch(err => {
        console.log(err);
        setPreloader(false);
    });
  }
  //end

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

  // functionality -- getting User Coupons
  function getCoupons() {
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
  }
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
    localStorage.removeItem('logInJwt');
    localStorage.removeItem('logInJwtRefresh');
    localStorage.removeItem('adresses');
    localStorage.removeItem('orders');
    localStorage.removeItem('coupons');
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

  // useEffect ошибки
      useEffect(() => {
        setErrorMessage('');
    }, [setErrorMessage]);
    //end

    // Проверяю, выполнял ли пользователь вход ранее
    useEffect(() => {
      handleTokenCheck();
    }, [handleTokenCheck]);
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
                .then(([userData, orders, coupons, addresses]) => {
                 //console.log(localStorage.getItem('coupons', JSON.stringify(coupons)));

                    setCurrentUser(userData);
                    getAdressApi(addresses);
                    //handlePostUserAdress(); // Получите адреса пользователя
                    getOrdersApi(orders);
                    getCoupons(coupons);
                    localStorage.getItem('addresses');
                    //localStorage.getItem('adresses', JSON.stringify(adresses));
                   // localStorage.getItem('orders', JSON.stringify(orders));
                    //localStorage.getItem('coupons', JSON.stringify(coupons));
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
      setIsBurger(isBurger);
      setBurgerHeader(burgerHeader);
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
    // eslint-disable-next-line
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

      <BurgerMenu isBurger={isBurger} handleBurgerMenu={handleBurgerMenu} />

      <HeaderBurger burgerHeader={burgerHeader} handleBurgerHeader={handleBurgerHeader} />

      <HeaderMenu handleBurgerHeader={handleBurgerHeader} />

        <Header/>

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
            path='/registration/activation/:uid/:token'
            element={ActivationPage}
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
                  <MyAdress
                    logIn={logIn}
                    addresses={addresses}
                    onDeleteAdress={handleDeleteAdress}
                    onUpdateAdresses={handlePostUserAdress}
                    onChangeAdress={handleChangeAdress}
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
                  coupons={coupons}
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
              />}
          />

          <Route 
            path='/rolls' 
            element={
              <Rolls
                dishes={dishes}
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
              />} 
          />

          <Route 
            path='/backed' 
            element={
              <Backed
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/tempura' 
            element={
              <Tempura
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/sandochi' 
            element={
              <Sandochi
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/handrolls' 
            element={
              <Handrolls
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/maki' 
            element={
              <Maki
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/sushi' 
            element={
              <Sushi
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/woks' 
            element={
              <Woks
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/soups' 
            element={
              <Soups
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/vegan'
            element={
              <Vegan
                dishes={dishes}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
              />} 
          />

          <Route 
            path='/cart' 
            element={<Cart/>} 
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
        />
        
        <Footer/>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
