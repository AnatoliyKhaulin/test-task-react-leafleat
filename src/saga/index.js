import { all } from "redux-saga/effects";
import { requestsWatcher } from "./requestsSaga";
import { citiesWatcher } from "./citiesSaga";

export function* rootWatcher() {
  yield all([requestsWatcher(), citiesWatcher()]);
}
