import { put, takeEvery } from "redux-saga/effects";
import {
  ASYNC_GET_CITIES,
  getCitiesAction
} from "../store/reducers/citiesReducer";
import citiesData from "../cities.json";

export function* citiesWorker() {
  yield put(getCitiesAction(citiesData));
}

export function* citiesWatcher(params) {
  yield takeEvery(ASYNC_GET_CITIES, citiesWorker);
}
