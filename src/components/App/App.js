
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';

import Header from '../Header/Header';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import Register from '../Register/Register';
import Login from '../Login/Login';
import ResetPasswordRequest from '../../utils/ResetPasswordRequest';
import ResetPasswordConfirm from '../../utils/ResetPasswordConfirm';
import ActivationPage from '../../utils/ActivationPage';
import Profile from '../Profile/Profile';
import MyOrders from '../MyOrders/MyOrders';
import MyAddress from '../MyAddress/MyAddress';
import MyCoupons from '../MyCoupons/MyCoupons';

import Dishes from '../Dishes/Dishes';
import PopupDish from '../PopupDish/PopupDish';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import Extra from '../Extra/Extra';
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

import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';

import './App.css';

import Banner from '../Banner/Banner'; // удалить позже

function App() {

  // location
  const navigate = useNavigate();

  // language state
  const [language, setLanguage] = useState('ru'); //начальный язык

  // users state
  const [currentUser, setCurrentUser] = useState({  addresses: []});

  const [logIn, setLogIn] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [orders, setOrders] = useState([]);

  //const [coupons, setCoupons] = useState([]); нет на бэке

  // Promo news Items state
  const [promoNews, setPromoNews] = useState([]);

  // About us and our contacts state
  const [aboutUs, setAboutUs] = useState(null);

  // dishes Items
  const [dishes, setDishesItems] = useState([]);

  // Проверяем, есть ли элементы в корзине
  //const [cartData, setCartData] = useState([]);
  const [cartData, setCartData] = useState(() => {
    // Пытаемся получить данные из localStorage
    const localData = localStorage.getItem('cartDishes');
    return localData ? JSON.parse(localData) : [];
});

  //состояние для промокода
  const [promoCode, setPromoCode] = useState('');

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

  // для отрисовки блюд в корзине
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  // functionality -- registration
  function handleRegister(first_name, last_name,  email, phone, password) {
    setPreloader(true);
      apiAuth.auth({ first_name, last_name, email, phone, password })
          .then((res) => {
              if (res !== 400) {
                setCurrentUser(current => {
                  const updatedUser = {...current, ...res};
                  if (!res.addresses && current.addresses) {
                    updatedUser.addresses = current.addresses;
                  }
                  return updatedUser;
                });
                  navigate('/login');
                  setPreloader(false);
              }
          }).catch(err => {
                /*if (err === 'Ошибка: 409') {
                  setErrorMessage('errors.user_already_exists');
                } else {
                  setErrorMessage('errors.error_during_registration');
                }*/
                handleAuthError(err);
                setErrorMessage('errors.error_during_registration');
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
            /*if (err === 'Ошибка: 401') {
              setErrorMessage('errors.incorrect_email_or_password');
              setLogIn(false);
            } else {
              setErrorMessage('errors.error_during_login');
            }*/
            handleAuthError(err);
            setErrorMessage('errors.error_during_login');
            console.log(err);
            setPreloader(false);
        });
  }
  //end

  // functionality -- update user info
  function handleUpdateProfile(first_name, last_name, phone, date_of_birth,
    messenger) {
      setPreloader(true);
        MainApi.changeUserInformation({ first_name, last_name, phone, date_of_birth,
          messenger })
        .then((res) => {
          setCurrentUser(current => {
            const updatedUser = {...current, ...res};
            if (!res.addresses && current.addresses) {
              updatedUser.addresses = current.addresses;
            }
            return updatedUser;
          });
            setErrorMessage('errors.success_change_profile');
            setPreloader(false);
        }).catch(err => {
          /* if (err === 'Ошибка: 409') {
              setErrorMessage('errors.user_already_exists');
            } else {
              setErrorMessage('errors.error_during_data_change');
            }*/
            handleAuthError(err);
            setErrorMessage('errors.error_during_data_change');
            console.log(err);
            setPreloader(false);
        });
  }

  function handleChangeEmail(currentPassword, newEmail) {
    setPreloader(true);
    apiAuth.newEmailRequest({ current_password: currentPassword, new_email: newEmail })
      .then(() => {
        // Показываем сообщение о том, что на новый адрес отправлено письмо со ссылкой для верификации
        setErrorMessage('errors.email_change_requested');
        setPreloader(false);
      }).catch(err => {
        const message = err.message || 'Неизвестная ошибка';
        if (message.includes('409')) {
            setErrorMessage('errors.user_already_exists');
        } else if (message.includes('400')) {
            setErrorMessage('errors.same_email');
        } else {
        setErrorMessage('errors.error_during_data_change');
        }
        console.error('Ошибка:', err);
        setPreloader(false);
    });
  }

  function handleChangePassword(currentPassword, newPassword) {
    setPreloader(true);
    apiAuth.newPasswordRequest({ current_password: currentPassword, new_password: newPassword })
      .then(() => {
        // Показываем сообщение о том, что на адрес отправлен новый пароль
        setErrorMessage('errors.password_change_requested');
        setPreloader(false);
      }).catch(err => {
        const message = err.message || 'Неизвестная ошибка';
          if (message.includes('409')) {
              setErrorMessage('errors.user_already_exists');
          } else {
              setErrorMessage('errors.error_during_data_change');
          }
        console.error('Ошибка:', err);
        setPreloader(false);
    });
  }
  //end

  // functionality -- getting User Address information
  function getAddressApi() {
    setPreloader(true);
    MainApi.getUserAdress()
        .then(addresses => {
            setCurrentUser(user => ({ ...user, addresses }));
            setAddresses(addresses);
            localStorage.setItem('addresses', JSON.stringify(addresses));
            setPreloader(false);
          }).catch(err => {
              handleAuthError(err);
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
          setCurrentUser(addresses);
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
  /*function handleChangeAdress(address) {
    setPreloader(true);
    MainApi.changeAdress({ address })
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
        setCurrentUser(addresses);
        setAddresses((prevAddresses) => {
          const updatedAddresses = prevAddresses.filter((addressItem) => addressItem.id !== id);
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
              handleAuthError(err);
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
              handleAuthError(err);
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

  // functionality -- getting news from Api
  function getAboutUsfunction() {
    setPreloader(true);
    MainApi.getOurContacts()
      .then((data) => {
        setAboutUs(data);
        setPreloader(false);
      })
      .catch(err => {
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

  // functionality -- dishes for cart
  function getDishForCart() {
    setPreloader(true);
    // Возвращаем промис, чтобы его можно было использовать в useEffect
    return MainApi.getCartData()
      .then((cartResponse) => {
        // Если cartResponse - это массив с объектом, содержащим поле cartdishes
        const cartItems = (cartResponse[0]?.cartdishes) || [];
        setCartData(cartItems);
        localStorage.setItem('cartDishes', JSON.stringify(cartItems));
        setPreloader(false);
        return cartItems; // Возвращаем результат
      })
      .catch(err => {
        console.log(err);
        setPreloader(false);
        throw err; // Возвращаем ошибку в промис, чтобы она была доступна в .catch()
      });
  }

  useEffect(() => {
    const storageData = localStorage.getItem('cartDishes');
    if (storageData) {
      // Если данные были в локальном хранилище, устанавливаем их в состояние
      const storedCartData = JSON.parse(storageData);
      setCartData(storedCartData);
      setIsLoadedFromStorage(true); // Устанавливаем флаг, что данные загружены из хранилища
    } else {
      // Если данных нет, делаем запрос на сервер
      getDishForCart()
        .then(cartItems => {
          console.log('cartDishes from getDishForCart', cartItems);
        })
        .catch(error => {
          console.error('Error during getDishForCart', error);
        });
    }
  }, []); // Зависимости для useEffect пусты, так что он выполнится один раз при монтировании компонента

  // Функция для удаления всех блюд из корзины
  const handleClearCart = () => {
    MainApi.deleteAllDishes()
        .then(() => {
            setCartData([]); // очищаем корзину на клиенте
            localStorage.removeItem('cartDishes'); // удаляем данные о корзине из `localStorage`
            // Можно также установить пустой массив, используя localStorage.setItem('cartDishes', JSON.stringify([]));
        })
        .catch(error => {
            console.error("Ошибка при очистке корзины: ", error);
        });
  };

  /* const updateCartData = (newCartData) => {
    setCartData(newCartData);
    // если API возвращает новый массив данных корзины, обновляем его состояние
    localStorage.setItem('cartDishes', JSON.stringify(newCartData)); // сохраним обновленные данные корзины в localStorage
  };

  const handleIncreaseQuantity = (id) => {
    MainApi.getDishCartPlus(id)
      .then(data => {
        updateCartData(data); // функция для обновления состояния cartData
      })
      .catch(error => console.error('Ошибка при увеличении количества блюда', error));
  };

  const handleDecreaseQuantity = (id) => {
    MainApi.getDishCartMinus(id)
      .then(data => {
        updateCartData(data); // функция для обновления состояния cartData
      })
      .catch(error => console.error('Ошибка при уменьшении количества блюда', error));
  };*/
  //end

  // добавление в корзину
  const handleAddToCart = (newItem) => {
    setCartData(prevItems => {
      if (!Array.isArray(prevItems)) {
          console.error('prevItems is not an array', prevItems);
          prevItems = [];
      }
      const isItemAlreadyInCart = prevItems.some(cartItem => cartItem.dish.article === newItem.article);
      const updatedCart = !isItemAlreadyInCart
        ? [...prevItems, { dish: newItem, quantity: 1 }]
        : prevItems.map(cartItem =>
            cartItem.dish.article === newItem.article
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
      // Сохраняем обновлённую корзину в localStorage
      localStorage.setItem('cartDishes', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleSubmitPromo = () => {
    MainApi.postPromoMethod({ promocode: promoCode })
        .then(data => {
            // Если data не является массивом, не обновляем cartData
            if (!Array.isArray(data)) {
                throw new Error('Invalid cart data format');
            }
            setCartData(data);
            setErrorMessage(null); // Очистка ошибки после успешного запроса
        })
        .catch(error => {
            // текущая обработка ошибок, можете добавить обработку ошибки из then
            console.error(error); // Для отладки
            setErrorMessage('errors.promo_notfound');
        });
  };
  // end

  // вызываем при получении ошибки 401:
  const handleAuthError = (err) => {
    if (err.status === 401) {
      handleLogout();
    }
  };

  // functionality -- clear token and exit
  const handleLogout = () => {
    //шаги для очистки localStorage и состояния пользователя
    localStorage.removeItem('addresses');
    localStorage.removeItem('orders');
    localStorage.removeItem('coupons');
    localStorage.removeItem('logInJwt');
    localStorage.removeItem('logInJwtRefresh');
    window.localStorage.clear(); //вызывается перед удалением конкретных элементов
    setLogIn(false);
    setCurrentUser({});
    // navigate для вывода пользователя на главную страницу
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
          if (res.status === 401 && logInJwtRefresh) {
            apiAuth.tokenRefresh(logInJwtRefresh)
              .then((res) => {
                localStorage.setItem('logInJwt', res.access);
                localStorage.setItem('logInJwtRefresh', res.refresh);
                setLogIn(true);
                setCurrentUser(current => ({ ...current, ...res }));
              })
              .catch((err) => {
                handleAuthError(err);
                console.log(err);
                setLogIn(false);
              });
          } else {
            setLogIn(true);
            setCurrentUser(current => ({ ...current, ...res }));
          }
        })
        .catch((err) => {
          handleAuthError(err);
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
      getAboutUsfunction();
      //getDishForCart();
    }, []); // Пустой массив зависимостей, чтобы запрос выполнился один раз
    //end

    useEffect(() => {
      if (logIn) {
        Promise.all([MainApi.getUserId()])
          .then(([userData, addressesData, ordersData]) => {
            setCurrentUser(userData);
            getAddressApi(addressesData);
            getOrdersApi(ordersData);
            localStorage.setItem('addresses', JSON.stringify(addressesData));
            // getCoupons(couponsData);
          })
          .catch(err => {
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
    //end

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
      <I18nextProvider i18n={i18n}>

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
        cartData={cartData} 
      />

        <Header 
          language={language} 
          onLanguageChange={setLanguage}
          cartData={cartData}
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
            path='/reset-password' 
            element={
              <ResetPasswordRequest />} 
          />

          <Route 
            path='/reset_password_confirm/:uid/:token' 
            element={
              <ResetPasswordConfirm />} 
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
                  onUpdateEmail={handleChangeEmail}
                  onUpdatePassword={handleChangePassword}
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
                  language={language}
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
                    language={language}
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
                  language={language}
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
                onAddToCart={handleAddToCart}
              />}
          />

          <Route 
            path='/extra' 
            element={
              <Extra
                dishes={dishes}
                language={language}
                onDishClick={handleDishClick}
                handleBurgerMenu={handleBurgerMenu}
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
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
                onAddToCart={handleAddToCart}
              />} 
          />

          <Route 
            path='/cart' 
            element={
              <Cart
                dishes={dishes}
                cartData={cartData}
                setCartData={setCartData}
                language={language}
                onAddToCart={handleAddToCart}
                extraDishes={dishes.filter(dish => dish.category.some(cat => cat.slug === "extra"))}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                handleSubmitPromo={handleSubmitPromo}
                errorMessage={errorMessage}
                onClearCart={handleClearCart}
                //onIncreaseQuantity={handleIncreaseQuantity}
                //onDecreaseQuantity={handleDecreaseQuantity}
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
            element={
              <Contacts
                aboutUs={aboutUs}
                language={language}
              />
            }
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
      </I18nextProvider>
    </>
  );
}

export default App;
