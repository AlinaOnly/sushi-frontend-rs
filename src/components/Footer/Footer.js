import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import instagram from '../../images/instagram.svg';
import telegram from '../../images/telegram.svg';
import viber from '../../images/viber.svg';
import whatsapp from '../../images/whatsapp.svg';
import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {

    const { t } = useTranslation();

    return (
        <footer className="footer">
            <Link to="/">
                <img src={logo} alt="Логотип сайта Sushi" className="footer__logo app__button-opacity" />
            </Link>
            <div className="footer__container">
            <NavLink className={({ isActive }) => (isActive ? "footer__link-active app__text-opacity" : "footer__link app__text-opacity")}
                to="/">{t('footer.menu', 'Меню')}
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "footer__link-active app__text-opacity" : "footer__link app__text-opacity")}
                to="/contacts">{t('footer.about', 'О нас')}
            </NavLink>  
            <NavLink className={({ isActive }) => (isActive ? "footer__link-active app__text-opacity" : "footer__link app__text-opacity")}
                to="/promo">{t('footer.promo', 'Промо')}
            </NavLink>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a className="footer__link app__text-opacity"
                            target="_blank"
                            href="https://www.instagram.com/yume_sushi.rs?igshid=MmVlMjlkMTBhMg=="
                            rel="noreferrer noopener">
                            <img src={instagram} alt="Логотип сайта Instagram" className="footer__logo-instagram"/>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link app__text-opacity"
                            target="_blank"
                            href="https://t.me/yume_sushi_bot"
                            rel="noreferrer noopener">
                            <img src={telegram} alt="Логотип сайта Telegram" className="footer__logo-telegram"/>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link app__text-opacity"
                            target="_blank"
                            href="https://viber.com"
                            rel="noreferrer noopener">
                            <img src={viber} alt="Логотип сайта Viber" className="footer__logo-viber"/>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link app__text-opacity"
                            target="_blank"
                            href="https://whatsapp.com"
                            rel="noreferrer noopener">
                            <img src={whatsapp} alt="Логотип сайта Whatsapp" className="footer__logo-whatsapp"/>
                        </a>
                    </li>
                </ul>
                
            </div> 
            <p className="footer__copyright">&copy; 2024</p>
        </footer>
    );
}

export default Footer;