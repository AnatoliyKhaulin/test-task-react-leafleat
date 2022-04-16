import { put, takeEvery } from "redux-saga/effects";
import {
  ASYNC_GET_REQUESTS,
  getRequestsAction
} from "../store/reducers/requestsReducer";
import requestsData from "../requests.json";

export function* requestsWorker() {
  yield put(getRequestsAction(requestsData));
}

export function* requestsWatcher(params) {
  yield takeEvery(ASYNC_GET_REQUESTS, requestsWorker);
}
