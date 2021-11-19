import './App.css';
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io.connect('http://localhost:4000');

function App() {
    const [state, setState] = useState([]);
    
    useEffect(() => {
        socket.emit('start');
        socket.on("ticker", (response) => {
            setState(response)
        });
    }, []);
    
    console.log(state)
    
    return (
        <div className="App">
            {
                state.map((key, index) => (
                    <ul key={index} style={{display: 'flex'}}>
                        <li >ticker: {key.ticker} </li>
                        <li >exchange: {key.exchange} </li>
                        <li >price: {key.price} </li>
                        <li >yield: {key.yield} </li>
                        <li >change percent: {key.change_percent} </li>
                        <li >change: {key.change} </li>
                        <li >dividend: {key.dividend} </li>
                        <li >last trade time: {key.last_trade_time} </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default App;
