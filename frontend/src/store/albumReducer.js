import {GET_ALBUMS_SUCCESS, GET_ALBUMSS_SUCCESS} from "../store/albumAction";

const initialState = {
    albums: [],
    adminAlbs:[]
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS_SUCCESS:
            return {...state, albums: action.albums, loading: false};
        case GET_ALBUMSS_SUCCESS:
            return {...state, adminAlbs:action.albums };
        default:
            return state;
    }
};

export default albumsReducer;