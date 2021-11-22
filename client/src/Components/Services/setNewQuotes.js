import SocketApi from "../../SocketApi/SocketApi";
import {setNewQuotesAC} from "../../Redux/reducer";

export const setNewQuotes = () => async (dispatch) => {
    SocketApi.emitStart();
    SocketApi.onTicker(dispatch, setNewQuotesAC);
}