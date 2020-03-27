import axiosApi from "../axiosApi";
import {push} from 'connected-react-router';

export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';

export const getAlbumsSuccess = albums => ({type: GET_ALBUMS_SUCCESS, albums});

export const getAlbums = id => {
    return async dispatch => {
        const response = await axiosApi.get(`/albums?author=${id}`);
        dispatch(getAlbumsSuccess(response.data));
    }
};
export const getAlb = () => {
    return async dispatch => {
        const response = await axiosApi.get(`/albums`);
        dispatch(getAlbumsSuccess(response.data));
    }
};
export const postAlbum = data => {
    return async dispatch => {
        await axiosApi.post('/albums',data)
    }
};
export const deleteAlbum = data => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

        await axiosApi.delete(`/albums/${data}`,{headers: {'Authorization': 'Token ' + user._id}});
        dispatch(push('/'));
    }
};