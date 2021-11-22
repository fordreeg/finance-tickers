import SocketApi from "../../SocketApi/SocketApi";

export const addNewTicker = (nameTicker, exchange, setError) => {
    SocketApi.emitAddTicker(nameTicker, exchange)
    SocketApi.onTickerAddError(setError)
}
