import SocketApi from "../../SocketApi/SocketApi";

export const removeTicker = (nameTicker) => {
    SocketApi.emitRemoveTicker(nameTicker)
}