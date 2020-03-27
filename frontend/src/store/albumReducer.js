import {GET_ALBUMS_SUCCESS} from "../store/albumAction";

const initialState = {
    albums: []
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS_SUCCESS:
            return {...state, albums: action.albums, loading: false};
        default:
            return state;
    }
};

export default albumsReducer;