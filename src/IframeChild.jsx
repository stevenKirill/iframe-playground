import React, { useState, useEffect } from 'react';
import { origin } from './constants';
import { Select } from '@material-ui/core';
import MyButton from './MyButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const IframeChild = () => {
    const [messages,setMessages] = useState([]);
    const [selectValue,setSelectValue] = useState('');

    useEffect(() => {
        window.addEventListener('message',(e) => {
            if (e.origin !== origin) return;
           const { data } = e;
           if (!data) return;
           if(data === 'clear') {
            setMessages([]);
           } else {
            setMessages(prev => {
                return [
                    ...prev,
                    data
                ]
            })
           }
        });
    },[]);

    const sendMessageToParent = () => {
        window.parent.postMessage(selectValue, origin)
    };

    const handleChangeSelectValue = (e) => {
        setSelectValue(e.target.value)
    };

    return (
        <div>
            <h2>Дочернее окно</h2>
            <ul>
                {messages.map(message => {
                    return (
                        <li>{message}</li>
                    )
                })}
            </ul>
            <MyButton
                variant="contained"
                color="primary"
                size="medium"
                onClick={sendMessageToParent}
                text="Отправить сообщение родителю"
            />
            <div style={{ marginTop: '20px' }}>
                <FormControl>
                    <InputLabel className="my-label">Возраст</InputLabel>
                    <Select
                        placeholder="Возраст"
                        value={selectValue}
                        onChange={handleChangeSelectValue}
                    >
                        <MenuItem value=""><em>Не выбрано</em></MenuItem>
                        <MenuItem value={5}>Пять</MenuItem>
                        <MenuItem value={10}>Десять</MenuItem>
                        <MenuItem value={20}>Двадцать</MenuItem>
                        <MenuItem value={30}>Тридцать</MenuItem>
                        <MenuItem value={40}>Сорок</MenuItem>
                        <MenuItem value={50}>Пятьдесят</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default IframeChild
