import './App.css';
import 'antd/dist/antd.css';
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNewQuotes} from "./Redux/reducer";
import {Input, Tooltip, Button, Divider, Alert} from "antd";
import {FieldBinaryOutlined, InfoCircleOutlined} from '@ant-design/icons';
import ListTickers from "./Components/ListTickers/ListTickers";
import Text from "antd/es/typography/Text";
import axios from "axios";

const socket = io.connect('http://localhost:4000');

function App() {
    const dispatch = useDispatch();
    const quotes = useSelector(state => state.data.quotes);
    const [newFetchInterval, setNewFetchInterval] = useState('');
    const [nameTicker, setNameTicker] = useState('');
    const [exchange, setExchange] = useState('');
    const [error, setError] = useState(null);
    
    const onToggleTickerStatus = (nameTicker, status) => {
        socket.emit('TICKER:STATUS_TOGGLE', {nameTicker, status});
    }
    
    const onRemoveTicker = (nameTicker) => {
        socket.emit('TICKER:REMOVE', {nameTicker});
    }
    
    const onSetNewFetchInterval = () => {
        socket.emit('TICKER:SET_INTERVAL', {interval: newFetchInterval * 1000});
        setNewFetchInterval('');
    }
    
    const onAddNewTicker = async () => {
        socket.emit('TICKER:ADD', {nameTicker, exchange});
        socket.on('TICKER:ADD_ERROR', (response) => {
            setError(response.error);
        });
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
        <>
            <ListTickers quotes={quotes} removeTicker={onRemoveTicker}
                         toggleTickerStatus={onToggleTickerStatus}/>
            <div className="wrapper">
                <IntervalInput setNewFetchInterval={setNewFetchInterval}
                               onSetNewFetchInterval={onSetNewFetchInterval}
                               newFetchInterval={newFetchInterval}
                />
                <NewTicker setNameTicker={setNameTicker} setExchange={setExchange}
                           onAddNewTicker={onAddNewTicker} nameTicker={nameTicker}
                           exchange={exchange} error={error}
                />
            </div>
        </>
    );
}

const IntervalInput = ({setNewFetchInterval, newFetchInterval, onSetNewFetchInterval}) => {
    return (
        <div className='intervalInput'>
            <Divider>
                <Text type="secondary">Enter the number of seconds after which tickers should be updated</Text>
            </Divider>
            <Input
                placeholder="Enter the number of seconds"
                prefix={<FieldBinaryOutlined />}
                onChange={(e) => {
                    setNewFetchInterval(e.target.value)
                }}
                value={newFetchInterval}
                type="number"
                suffix={
                    <Tooltip title="Enter the number of seconds after which tickers should be updated">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <Button onClick={onSetNewFetchInterval} type="primary" disabled={newFetchInterval === ''}>
                Set new interval
            </Button>
        </div>
    );
};

const NewTicker = ({setNameTicker, setExchange, onAddNewTicker, nameTicker, exchange, error}) => {
    return (
        <div>
            <Divider>
                <Text type="secondary">Add new ticker</Text>
            </Divider>
            <Input
                placeholder="Ticker name"
                onChange={(e) => {
                    setNameTicker(e.target.value)
                }}
                value={nameTicker}
                type="text"
            />
            <Input
                placeholder="Exchange"
                onChange={(e) => {
                    setExchange(e.target.value)
                }}
                value={exchange}
                type="text"
            />
            <Button onClick={onAddNewTicker} type="primary" disabled={exchange === '' || nameTicker === ''}>
                Add new ticker
            </Button>
            {error && <span><Alert message={error} type="error" /></span>}
        </div>
    )
}

export default App;
