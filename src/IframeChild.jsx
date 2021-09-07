import React, { useState, useEffect } from 'react';
import { origin } from './constants';

const IframeChild = () => {
    const [messages,setMessages] = useState([]);

    useEffect(() => {
        window.addEventListener('message',(e) => {
            if (e.origin !== origin) return;
           const { data } = e;
           if (!data) return;
           setMessages(prev => {
               return [
                   ...prev,
                   data
               ]
           })
        });
    },[]);

    return (
        <div>
            <h2>Дочернее окно</h2>
            <ul>
                {/* {messages.map(message => {
                    return (
                        <li>{message}</li>
                    )
                })} */}
            </ul>
        </div>
    );
}

export default IframeChild
