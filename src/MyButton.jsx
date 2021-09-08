import React from 'react';
import Button from '@material-ui/core/Button';

const MyButton = ({ variant, color, size, onClick, text, className = '' }) => {
    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            onClick={onClick}
            className={className}
        >
            {text}
        </Button>
    )
}

export default MyButton
