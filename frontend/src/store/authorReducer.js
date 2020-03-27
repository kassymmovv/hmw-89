import {GET_AUTHOR_SUCCESS} from "../store/authorActions";

const initialState = {
    authors: []
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTHOR_SUCCESS:
            return {...state, authors: action.author, loading: false};
        default:
            return state;
    }
};

export default artistsReducer;