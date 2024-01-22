
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Header from '../Header/Header';

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

import Promo from '../Promo/Promo';
import Contacts from '../Contact/Contact';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

import MainApi from '../../utils/MainApi';
import * as apiAuth from '../../utils/apiAuth';
import { CONFLICT_REG, ERR_REGISTER, WRONG_PASS, WRONG_TOKEN } from '../../utils/errors';
import './App.css';



function App() {
  // location
  const navigate = useNavigate();

  // users state
  const [currentUser, setCurrentUser] = useState({});
  const [logIn, setLogIn] = useState(false);
  const [isAdresses, setAdresses] = useState([]);

  // dishes Items
  const [dishes, setDishesItems] = useState([]);

  // dishes Items state
  const [selectedDish, setSelectedDish] = useState({});

  // burgeropen state
  const [isBurger, setIsBurger] = useState(false);

   // errors state
  const [errorMessage, setErrorMessage] = useState('');


  // functionality -- registration
  function handleRegister(first_name, last_name,  email, phone, password) {
    apiAuth.auth({ first_name, last_name, email, phone, password })
        .then((res) => {
            if (res !== 400) {
                setCurrentUser(res);
                navigate('/auth/jwt/create/');
            }
        }).catch(err => {
            if (err === 'Ошибка: 409') {
                setErrorMessage(CONFLICT_REG);
            } else {
                setErrorMessage(ERR_REGISTER);
            }
            console.log(err);
    });
  }
  //end

  // functionality -- login
  function handleLogin(email, password) {
    apiAuth.login({ email, password })
        .then((res) => {
            if(res) { 
                localStorage.setItem('logInJwt', res.access);
                localStorage.setItem('logInJwtRefresh', res.refresh);
                handleTokenCheck();
                setLogIn(true);
                navigate('/auth/users/me/');
            }
        }).catch(err => {
            if (err === 'Ошибка: 401') {
                setErrorMessage(WRONG_PASS);
                setLogIn(false);
            } else {
                setErrorMessage(WRONG_TOKEN);
            }
            console.log(err);
        });
  }
  //end

  // functionality -- update user info
  function handleUpdateProfile(first_name, last_name, phone, email) {
        MainApi.changeUserInformation({ first_name, last_name, phone, email })
        .then((res) => {
            setCurrentUser(res);
            setErrorMessage('Ваши данные успешно изменены');
        }).catch(err => {
            if (err === 'Ошибка: 409') {
                setErrorMessage(CONFLICT_REG);
            } else {
                setErrorMessage(ERR_REGISTER);
            }
            console.log(err);
        });
  }
  //end


  // functionality -- getting User Adress information
  function getAdressApi() {
    MainApi. getUserAdress()
        .then((adresses) => {
              setAdresses(adresses);
              localStorage.setItem('adresses', JSON.stringify(adresses));
          }).catch(err => {
              console.log(err);
          });
  }

  // functionality -- clear token and exit
  const handleLogout = () => {
    localStorage.removeItem('logInJwt');
    localStorage.removeItem('logInJwtRefresh');
    localStorage.removeItem('adresses');
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

   // functionality -- getting dishes from Api
    function getDishes() {
        MainApi.getDishesFromApi()
        .then((dishes) => {
              setDishesItems(dishes);
              localStorage.setItem('dishes', JSON.stringify(dishes));
          }).catch(err => {
              console.log(err);
          });
    }
  //end

  // useEffect ошибки
      useEffect(() => {
        setErrorMessage('');
    }, [setErrorMessage]);
    //end

    // Проверяю выполнял ли пользователь вход ранее
    useEffect(() => {
      handleTokenCheck();
    }, [handleTokenCheck]);
    //end


    // отрисовка меню
    useEffect(() => {
      getDishes();
    }, []);
    //end

    useEffect(() => {
        if (logIn) {
            Promise.all([MainApi.getUserId()])
                .then(([userData, adressData]) => {
                    setCurrentUser(userData);
                    getAdressApi(adressData);
                    localStorage.getItem('adressData', JSON.stringify(adressData));
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
    //end

    // popup dish
    function handleDishClick(dish) {
      setSelectedDish(dish);
    }
    //end

    function closePopup() {
      setSelectedDish({});
      setIsBurger(isBurger);
    }
    // end popup

    // Функция закрытия окна на оверлей
    useEffect(() => {
      function handleOverlayClick(evt) {
        if (evt.target.classList.contains("burger-menu") || evt.target.classList.contains("popup")) {
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

      <Header/>

      <Routes>
        <Route
          path='/auth/users/'
          element={
            <Register
              onRegister={handleRegister}
              errorMessage={errorMessage}
            />}
        />

        <Route 
          path='/auth/jwt/create/'
          element={
            <Login
              onLogin={handleLogin}
              errorMessage={errorMessage}
            />}
        />

        <Route 
          path='/auth/users/activation/:uid/:token'
          element={ActivationPage}
        />

        <Route 
          path='/auth/users/me/'
          element={
            <ProtectedRoute path='/auth/users/me/' logIn={logIn}>
              <Profile
                logIn={logIn}
                onUpdateProfile={handleUpdateProfile}
                handleLogout={handleLogout}
                errorMessage={errorMessage}
              />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/auth/users/me/my_orders/'
          element={
            <ProtectedRoute path='/auth/users/me/my_orders/' logIn={logIn}>
              <MyOrders
                logIn={logIn}
              />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/auth/users/me/my_addresses/'
          element={
              <ProtectedRoute path='/auth/users/me/my_addresses/' logIn={logIn}>
                <MyAdress
                  logIn={logIn}
                  isAdresses={isAdresses}
                />
              </ProtectedRoute>
            }
        />

        <Route 
          path='/auth/users/me/my_coupons/'
          element={
            <ProtectedRoute path='/auth/users/me/my_coupons/' logIn={logIn}>
              <MyCoupons
                logIn={logIn}
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
          element={<Promo/>}
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
