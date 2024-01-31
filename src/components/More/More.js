import React from 'react';
import './More.css';

function More({ handleMoreButton }) {
    return (
            <div className="dishes__loading">
                    <button
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