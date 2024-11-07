import React from 'react';
import './Button.css';

function Button({ text, onClick, variant = "default" }) {
    return (
        <button onClick={onClick} className={`custom-button ${variant}`}>
            {text}
        </button>
    );
}

export default Button;