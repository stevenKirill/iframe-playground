import React, { useRef, useEffect, useState } from 'react';
import { origin } from './constants';
import MyButton from './MyButton';
import InputBase from '@material-ui/core/InputBase';

const containerStyles = {
    margin: '10px auto',
    display: 'block',
    width: "1000px"
};

function IframeParent() {
    const [inputValue,setInputValue] = useState('');
    const [backMessage, setBackMessage] = useState('')
    const childRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        window.addEventListener("message", function (e) {
            console.log(e.origin)
            if (e.origin !== "http://localhost:3000") return;
            let recievedMessage = null;
            if (typeof e.data  === 'object') {
                recievedMessage = JSON.stringify(e.data,2,2)
            } else {
                recievedMessage = e.data;
            }
            setBackMessage(recievedMessage);
          });
    },[]);

    const sendMessage = () => {
        const { current } = childRef;
        if (!current) return
        current.contentWindow.postMessage(inputValue,origin)
        setInputValue('');
    };

    const sendClearAll = () => {
        const { current } = childRef;
        if (!current) return
        current.contentWindow.postMessage('clear',origin)
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
                <div>
                    <MyButton
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={sendMessage}
                        text="Отправить сообщение"
                    />
                </div>
                <div className="margin-left-10">
                    <MyButton
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={sendClearAll}
                        text="Очистить"
                    />
                </div>

            </div>
            <h3>{backMessage !== '' ? backMessage + ' лет' : ''}</h3>
            <iframe
                src="/iframe-child/"
                ref={childRef}
                height="300"
                width="700"
                className="my-iframe"
            >
            </iframe>
        </div>
    );
};

export default IframeParent;
