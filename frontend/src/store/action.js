import axiosApi from "../axiosApi";

export const POST_TRACKHIS_REQUEST = 'POST_TRACKHIS_REQUEST';
export const POST_TRACKHIS_SUCCESS = 'POST_TRACKHIS_SUCCESS';
export const POST_TRACKHIS_FAILURE = 'POST_TRACKHIS_FAILURE';


export const TrackHisRequest = () => ({type:POST_TRACKHIS_REQUEST});
export const TrackHisSuccess = trackhis => ({type:POST_TRACKHIS_SUCCESS, trackhis});
export const TrackHisFailure = error => ({type:POST_TRACKHIS_FAILURE,error});



export const postTrackHis = tracks => {
  return async(dispatch,getState) => {
      try{
          const track = getState().users.user;
          dispatch(TrackHisRequest());
         await axiosApi.post('/track_history',tracks,{headers:{'Token':track.token}});
      }catch (e) {
          dispatch(TrackHisFailure(e.response.data))
      }
  }
};

export const getTrackHis = () => {
    return async (dispatch,getState) =>{
        try {
            const track = getState().users.user;
            dispatch(TrackHisRequest());
            const response = await axiosApi.get('/track_history',{headers:{'Token':track.token}});
            dispatch(TrackHisSuccess(response.data));

        }catch (e) {
            dispatch(TrackHisFailure(e.response.data))
        }
    }
};