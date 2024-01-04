
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';


import Dishes from '../Dishes/Dishes';
import PopupDish from '../PopupDish/PopupDish';
import Cart from '../Cart/Cart';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import MyOrders from '../MyOrders/MyOrders';
import MyAdress from '../MyAdress/MyAdress';
import MyCoupons from '../MyCoupons/MyCoupons';

import Main from '../Main/Main';

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
  const location = useLocation();

  // users state
  const [currentUser, setCurrentUser] = useState({});
  const [logIn, setLogIn] = useState(false);

  // dishes Items
  const [dishesItems, setDishesItems] = useState([]);

  // dishes state
  const [selectedDish, setSelectedDish] = useState({});

  // burgeropen state
  const [isBurger, setIsBurger] = useState(false);

   // errors state
  const [errorMessage, setErrorMessage] = useState('');

  // JWT
  let logInJwt = false;


  // functionality -- registration
  function handleRegister(first_name, last_name,  email, phone, password) {
    apiAuth.auth({ first_name, last_name, email, phone, password })
        .then((res) => {
            if (res !== 400) {
                handleTokenCheck();
                localStorage.setItem('logInJwt', JSON.stringify(true));
                handleLogin(email, password); // login
                setCurrentUser(res);
                navigate('/');
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
            if(res !== 400) {
                handleTokenCheck();
                localStorage.setItem('logInJwt', JSON.stringify(res.token));
                setLogIn(true);
                navigate('/');
            }
        }).catch(err => {
            if (err === 'Ошибка: 401') {
                setErrorMessage(WRONG_PASS);
                //handleLogout();
                //setLogIn(false); //
            } else {
                setErrorMessage(WRONG_TOKEN);
            }
            console.log(err);
        });
  }
  //end

  // functionality -- update user info
  function handleUpdateProfile(first_name, last_name, phone, email) {
        MainApi.changeUserInformation({ first_name, last_name, phone, email }).then((res) => {
            setCurrentUser(res);
            handleTokenCheck();
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

  }

   // functionality -- clear token
  function handleLogout() {
    apiAuth.logout().then((res) => {
        if(res !== 400) {
            localStorage.clear();
            setLogIn(false);
            //localStorage.removeItem('jwt');
            //localStorage.removeItem('logInJwt');
             // не работает!!!
            setCurrentUser({});
            navigate('/');
        }
    }).catch(err => {
        console.log(err);
    });
  }
  //end

  // checking token
  const handleTokenCheck = useCallback(() => {
    const logInJwt = JSON.parse(localStorage.getItem('logInJwt'));
        if(logInJwt) {
            apiAuth.token()
            .then((res) => {
                if (res) {
                    localStorage.setItem('logInJwt', JSON.stringify(res.access.token));
                    setCurrentUser(res);
                    setLogIn(true);
                }
            }).catch(err =>
                console.log(err));
                setLogIn(false);
        }
  }, []);
  //end

   // functionality -- getting dishes from Api
    function getDishesFromApi() {
      if ((localStorage.getItem('dishes') ? false : true)) {
        MainApi.getDishById().then((dishesItems) => {
              setDishesItems(dishesItems);
              localStorage.setItem('dishes', JSON.stringify(dishesItems));
          }).catch(err => {
              console.log(err);
          });
      }
}
//end

  // useEffect
      useEffect(() => {
        setErrorMessage('');
    }, [setErrorMessage]);

    useEffect(() => {
     // handleTokenCheck();
        logInJwt = JSON.parse(localStorage.getItem('logInJwt'));
        if (logInJwt) {
            handleTokenCheck();
        }
    }, [handleTokenCheck, logInJwt]);

    useEffect(() => {
        if (logIn) {
            Promise.all([MainApi.getUserId(), MainApi.getUserAdress(), MainApi.getDishById()])
                .then(([userData, adressData, dishesData]) => {
                    setCurrentUser(userData);
                    getAdressApi(adressData);
                    getDishesFromApi(dishesData);
                    localStorage.getItem('dishesData', JSON.stringify(dishesData));
                    //localStorage.getItem('logInJwt', JSON.stringify(userData));
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
          path='/auth/users/me/'
          element={
            <Profile
              logIn={logIn}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              errorMessage={errorMessage}
            />}
        />

        <Route 
          path='/auth/users/me/my_orders/'
          element={<MyOrders/>}
        />

        <Route 
          path='/auth/users/me/my_addresses/'
          element={<MyAdress/>}
        />

        <Route 
          path='/auth/users/me/my_coupons/'
          element={<MyCoupons/>}
        />

        <Route 
          path='/'
          element={
          <Dishes
            selectedDish={selectedDish}
            onDishClick={handleDishClick}
            handleBurgerMenu={handleBurgerMenu}
            dishesItems={dishesItems}
          />}
        />

        <Route 
          path='/cart' 
          element={<Cart/>} 
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
