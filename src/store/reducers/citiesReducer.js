const initialState = {
  citiesList: []
};

export const GET_CITIES = "GET_CITIES";
export const ASYNC_GET_CITIES = "ASYNC_GET_CITIES";

export const citiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CITIES:
      return { ...state, citiesList: payload };

    default:
      return state;
  }
};

export const getCitiesAction = (payload) => ({
  type: GET_CITIES,
  payload
});

export const asyncGetCitiesAction = () => ({ type: ASYNC_GET_CITIES });
