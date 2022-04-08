import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const API_ENDPOINT = 'http://localhost:3001';
function SocketDemo() {
    const [response, setResponse] = useState([]);
    const [socket, setSocket] = useState(null);
    const [quotes, setQuotes] = useState();
    useEffect(() => {
        setSocket(socketIOClient(API_ENDPOINT));
        const destructFunction = () => {
            console.log(socket);
            socket.disconnect();
        };
        return destructFunction;
    }, []);
    useEffect(() => {
        connectSocketConnection(socket);
    }, [socket]);
    const connectSocketConnection = (socket) => {
        if (socket != null) {
            socket.on('GetRandom', (data) => {
                setResponse(data);
                console.log(response);
            });
            socket.on('GetQuotes', (data) => {
                setQuotes(data);
                console.log(data);
            });
        }
    };
    const socketConnect = () => {
        setSocket(socketIOClient(API_ENDPOINT));
    };
    const socketDisconnect = () => {
        socket.disconnect();
    };
    return (
        <div>
            <button className='btn btn-primary' onClick={socketConnect}>
                Connect
            </button>
            <button className='btn btn-danger' onClick={socketDisconnect}>
                Disconnect
            </button>
            <h4>Number Generated : {response}</h4>
            <h4>Quotes Geneated : {quotes}</h4>
        </div>
    );
}
export default SocketDemo;
