import {

    POST_TRACKHIS_SUCCESS,

} from "./action";


const initialState = {
    loading:false,
    error:null,

    trackHistory:[]

};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_TRACKHIS_SUCCESS:
            return {
                ...state,
                trackHistory: action.trackhis
            };
        default:
            return state;
    }
};

export default Reducer;