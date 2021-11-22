import {io} from "socket.io-client";

const socketApi = io.connect('http://localhost:4000');

const SocketApi = {
    emitStart: () => {
        socketApi.emit('start');
    },
    onTicker: (dispatch, ac) => {
        socketApi.on("ticker", (response) => {
            dispatch(ac(response))
        });
    },
    emitStatusToggle: (nameTicker, status) => {
        socketApi.emit('TICKER:STATUS_TOGGLE', {nameTicker, status});
    },
    emitRemoveTicker: (nameTicker) => {
        socketApi.emit('TICKER:REMOVE', {nameTicker});
    },
    emitSetInterval: (newFetchInterval) => {
        socketApi.emit('TICKER:SET_INTERVAL', {interval: newFetchInterval * 1000});
    },
    emitAddTicker: (nameTicker, exchange) => {
        socketApi.emit('TICKER:ADD', {nameTicker, exchange});
    },
    onTickerAddError: (setError) => {
        socketApi.on('TICKER:ADD_ERROR', (response) => {
            response && setError(response)
        });
    }
}

export default SocketApi;

