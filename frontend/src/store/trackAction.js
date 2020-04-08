import axiosApi from "../axiosApi";
import {push} from 'connected-react-router';

export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';

export const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, tracks});

export const getTracks = id => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

        const response = await axiosApi.get(`/tracks?album=${id}`,{headers: {'Authorization': 'Token ' + user.token}});
        dispatch(getTracksSuccess(response.data));
    }
};
export const postTrack = data => {
    return async dispatch => {
       const response = await axiosApi.post('/tracks',data);

    }
};
export const publishTrack = data => {
    return async dispatch => {
       const response = await axiosApi.post(`/tracks/publish/${data}`);

    }
};
export const deleteTrack = data => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

        await axiosApi.delete(`/tracks/${data}`,{headers: {'Authorization': 'Token ' + user._id}});
        dispatch(push('/'));
    }
};