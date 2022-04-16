import { applyMiddleware, combineReducers, createStore } from "redux";
import { requestsReducer } from "./reducers/requestsReducer";
import { citiesReducer } from "./reducers/citiesReducer";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  requestsReducer,
  citiesReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
