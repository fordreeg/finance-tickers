import SocketApi from "../../SocketApi/SocketApi";

export const setFetchInterval = (newFetchInterval) => {
    SocketApi.emitSetInterval(newFetchInterval)
}