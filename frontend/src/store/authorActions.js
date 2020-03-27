import axiosApi from '../axiosApi'

export const GET_AUTHOR_SUCCESS = 'GET_AUTHOR_SUCCESS';

export const getAuthorsSuccess = author => ({type: GET_AUTHOR_SUCCESS, author});
export const getAuthors = () => {
    return async dispatch => {
        const response = await axiosApi.get('/authors');
        dispatch(getAuthorsSuccess(response.data));
    }
};
export const postAuthor = data => {
    return async dispatch => {
      await axiosApi.post('/authors',data);
    }
};
export const deleteAuthor = data => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

         await axiosApi.delete(`/authors/${data}`,{headers: {'Authorization': 'Token ' + user._id}});
        dispatch(getAuthors());
    }
};