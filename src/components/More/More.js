import React from 'react';
import { useTranslation } from 'react-i18next';
import './More.css';

function More({ handleMoreButton }) {
        const { t } = useTranslation();
return (
        <div className="dishes__loading">
                <button
                        onClick={handleMoreButton}
                        className="dishes__button app__button-opacity"
                        type="button"
                        aria-label="Ещё">
                        {t('more-btn.more', 'Ещё')}
                </button> 
        </div>
        );
}

export default More;