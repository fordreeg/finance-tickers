import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    data: reducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));