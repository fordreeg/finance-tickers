import './App.css';
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewQuotes} from "./Redux/reducer";

const socket = io.connect('http://localhost:4000');

function App() {
    const dispatch = useDispatch();
    const quotes = useSelector(state => state.data.quotes);
    const [newFetchInterval, setNewFetchInterval] = useState('');
    const [nameTicker, setNameTicker] = useState('');
    const [exchange, setExchange] = useState('');
    
    const onToggleTickerStatus = (nameTicker, status) => {
        socket.emit('TICKER:STATUS_TOGGLE', {nameTicker, status});
    }
    
    const onRemoveTicker =  (nameTicker) => {
        socket.emit('TICKER:REMOVE', {nameTicker});
    }
    
    const onSetNewFetchInterval = () => {
        socket.emit('TICKER:SET_INTERVAL', {interval: newFetchInterval});
        setNewFetchInterval('');
    }
    
    const onAddNewTicker = () => {
        socket.emit('TICKER:ADD', {nameTicker, exchange});
        setNameTicker('');
        setExchange('');
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
                            <button onClick={() => {onRemoveTicker(key.ticker)}}>remove</button>
                        </div>
                        <hr/>
                    </div>
                ))
            }
            <div>
                <input type="number" placeholder='in ms format, example 1000' value={newFetchInterval} onChange={(e) => {setNewFetchInterval(e.target.value)}}/>
                <button onClick={onSetNewFetchInterval}>set new interval</button>
            </div>
            <div>
                <input type="text" placeholder='ticker name' value={nameTicker} onChange={(e) => {setNameTicker(e.target.value)}}/>
                <input type="text" placeholder='exchange' value={exchange} onChange={(e) => {setExchange(e.target.value)}}/>
                <button onClick={onAddNewTicker}>add new ticker</button>
            </div>
        </div>
    );
}

export default App;
