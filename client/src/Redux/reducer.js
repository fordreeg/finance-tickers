const SET_NEW_QUOTES = 'SET_NEW_QUOTES';

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

export const setNewQuotesAC = (quotes) => ({type: SET_NEW_QUOTES, quotes});