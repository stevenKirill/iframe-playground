import React, { useRef, useEffect, useState } from 'react';
import { origin } from './constants';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

const containerStyles = {
    margin: '10px auto',
    display: 'block',
    width: "1000px"
};

function IframeParent() {
    const [inputValue,setInputValue] = useState('');
    const childRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {

    },[]);

    const sendMessage = () => {
        const { current } = childRef;
        if (!current) return
        current.contentWindow.postMessage(inputValue,origin)
        setInputValue('');
    };

    const handleChange = (e) => {
        setInputValue(e.target.value)
    };

    return (
        <div style={containerStyles}>
            <h2>Родительское окно</h2>
            <div style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <InputBase
                    autoFocus="true"
                    color="primary"
                    placeholder="Введи текст"
                    inputRef={inputRef}
                    onChange={handleChange}
                    value={inputValue}
                    type="text"
                    className="with-border"
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={sendMessage}
                >
                    Отправить сообщение
                </Button>
            </div>
            <iframe
                src="/child-iframe"
                ref={childRef}
                height="300"
                width="700"
                className="my-iframe"
            />
        </div>
    );
};

export default IframeParent;
