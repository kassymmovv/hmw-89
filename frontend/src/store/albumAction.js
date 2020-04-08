import axiosApi from "../axiosApi";
import {push} from 'connected-react-router';

export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const PUBLISH_ALBUMS_SUCCESS = 'PUBLISH_ALBUMS_SUCCESS';
export const GET_ALBUMSS_SUCCESS = 'GET_ALBUMSS_SUCCESS';


export const getAlbumsSuccess = albums => ({type: GET_ALBUMS_SUCCESS, albums});
export const getAlbumssSuccess = albums => ({type:GET_ALBUMSS_SUCCESS, albums});
export const publishAlbumsSuccess = albums => ({type: PUBLISH_ALBUMS_SUCCESS, albums});



export const getAlbums = id => {

    return async (dispatch,getState) => {
        const user = getState().users.user;

        const response = await axiosApi.get(`/albums?author=${id}`,{headers: {'Authorization': 'Token ' + user.token}});
        console.log(response);
        dispatch(getAlbumsSuccess(response.data));
    }
};
export const getAlbs = () => {
    return async (dispatch,getState) => {
        const user = getState().users.user;
        const response = await axiosApi.get(`/albums`,{headers: {'Authorization': 'Token ' + user.token}});

        dispatch(getAlbumssSuccess(response.data));
    }
};
export const publishAlbums = id => {
    return async (dispatch,getState) => {
        const user = getState().albums.albums[0].author._id;

        await axiosApi.post(`/albums/publish/${id}`);
       getAlbums(user)

    }
};
export const postAlbum = data => {
    console.log(data);
    return async dispatch => {
       const response = await axiosApi.post('/albums',data);
    }
};
export const deleteAlbum = data => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

        await axiosApi.delete(`/albums/${data}`,{headers: {'Authorization': 'Token ' + user._id}});
        dispatch(push('/'));
    }
};