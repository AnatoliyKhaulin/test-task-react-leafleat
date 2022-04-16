const initialState = {
  requestsList: []
};

export const GET_REQUESTS = "GET_REQUESTS";
export const ASYNC_GET_REQUESTS = "ASYNC_GET_REQUESTS";

export const requestsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REQUESTS:
      return { ...state, requestsList: payload };
    default:
      return state;
  }
};

export const getRequestsAction = (payload) => ({
  type: GET_REQUESTS,
  payload
});

export const asyncGetRequestsAction = () => ({ type: ASYNC_GET_REQUESTS });
