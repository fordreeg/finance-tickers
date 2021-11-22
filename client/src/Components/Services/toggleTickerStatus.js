import SocketApi from "../../SocketApi/SocketApi";

export const toggleTickerStatus = (nameTicker, status) => {
    SocketApi.emitStatusToggle(nameTicker, status)
}