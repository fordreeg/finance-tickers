const SET_NEW_QUOTES = 'SET_NEW_QUOTES';
const SET_NEW_FETCH_INTERVAL = 'SET_NEW_FETCH_INTERVAL';

const initialState = {
    quotes: [],
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEW_QUOTES :
            return {
                ...state,
                quotes: [...action.quotes]
            }
        default:
            return state;
    }
}

const setNewQuotesAC = (quotes) => ({type: SET_NEW_QUOTES, quotes});
export const setNewQuotes = (quotes) => (dispatch) => {
    dispatch(setNewQuotesAC(quotes))
}


