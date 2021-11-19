import './App.css';
import {io} from "socket.io-client";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewQuotes} from "./Redux/reducer";
import axios from "axios";

const socket = io.connect('http://localhost:4000');

function App() {
    const dispatch = useDispatch();
    const quotes = useSelector(state => state.data.quotes);
    
    const onToggleTickerStatus = async (nameTicker, status) => {
        socket.emit('TICKER:OFF', {nameTicker, status});
        // let response = await axios.post('http://localhost:4000', {nameTicker, status});
    }
    
    useEffect(() => {
        socket.emit('start');
        socket.on("ticker", (response) => {
            dispatch(setNewQuotes(response))
        });
    }, []);
    
    return (
        <div className="App">
            {
                quotes.map((key, index) => (
                    <div key={index}>
                        <div style={{display: 'flex', fontSize: '14px'}}>
                            <span >ticker: {key.ticker}</span>
                            <span >exchange: {key.exchange}</span>
                            <span >price: {key.price}</span>
                            <span >yield: {key.yield}</span>
                            <span >change percent: {key.change_percent}--</span>
                            <span >change: {key.change}</span>
                            <span >dividend: {key.dividend}</span>
                            <span >last trade time: {key.last_trade_time}</span>
                            <span >status: {key.status ? 'ON' : 'OFF'}</span>
                            {
                                key.status
                                    ? <button onClick={() => onToggleTickerStatus(key.ticker, false)}>off</button>
                                    : <button onClick={() => onToggleTickerStatus(key.ticker, true)}>on</button>
                            }
                        </div>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
