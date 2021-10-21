/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./reducers/tasksReducer";
import userReducer from "./reducers/userReducer";


const redusers = combineReducers({
 user : userReducer,
 tasks : tasksReducer
});

const store = createStore(redusers, applyMiddleware(thunk));
window.store = store;

export default store;
