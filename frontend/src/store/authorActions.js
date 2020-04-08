import axiosApi from '../axiosApi'

export const GET_AUTHOR_SUCCESS = 'GET_AUTHOR_SUCCESS';

export const getAuthorsSuccess = author => ({type: GET_AUTHOR_SUCCESS, author});
export const getAuthors = () => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

        const response = await axiosApi.get('/authors',{headers: {'Authorization': 'Token ' + user.token}});
        dispatch(getAuthorsSuccess(response.data));
    }
};
export const postAuthor = data => {
    return async dispatch => {
      await axiosApi.post('/authors',data);
      dispatch(getAuthors())
    }
};
export const publishAuthor = data => {
    return async dispatch => {
      await axiosApi.post(`/authors/publish/${data}`);
        dispatch(getAuthors());

    }
};
export const deleteAuthor = data => {
    return async (dispatch,getState) => {
        const user = getState().users.user;

         await axiosApi.delete(`/authors/${data}`,{headers: {'Authorization': 'Token ' + user._id}});
        dispatch(getAuthors());
    }
};