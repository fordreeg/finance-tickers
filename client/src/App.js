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
                    <div key={index} style={{display: 'flex'}}>
                        <span >ticker: {key.ticker}--</span>
                        <span >exchange: {key.exchange}--</span>
                        <span >price: {key.price}--</span>
                        <span >yield: {key.yield}--</span>
                        <span >change percent: {key.change_percent}--</span>
                        <span >change: {key.change}--</span>
                        <span >dividend: {key.dividend}--</span>
                        <span >last trade time: {key.last_trade_time}--</span>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
