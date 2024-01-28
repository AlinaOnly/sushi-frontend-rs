import React from 'react';
import './More.css';

function More({ handleMoreButton, moreButton }) {
    return (
            <div className="dishes__loading">
                    <button 
                        //hidden={savedMoviesLocation || !moreButton}
                        onClick={handleMoreButton}
                        className="dishes__button app__button-opacity"
                        type="button"
                        aria-label="Ещё">
                        Ещё
                    </button> 
            </div>
    );
}

export default More;