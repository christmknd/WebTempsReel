import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_WS_BACK);

function Test() {
    const [message, setMessage] = useState('');
    useEffect( () => {
        fetch(`${process.env.REACT_APP_API_BACK}message`)
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch((error) => console.log(error))

        socket.on("connect", () => {
            console.log("Connected to the socket");
            var inputName = document.getElementById('MyIDSocket');
            inputName.innerText= `My ID socket ${socket.id}`;
        } )
      },[]);

    return (
        <div className="Test">
            <p id='MyIDSocket'></p>
            {`You receive ${message} message`}
            <script src="/socket.io/socket.io.js"></script>
        </div>
    );
}

export default Test;
