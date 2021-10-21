import {
  ADD_NEW_TASK,
  CHANGE_CURRENT_TASK,
  DELETE_CURRENT_TASK,
  DELETE_SOME_TASKS,
  SET_ALL_TASKS,
  SET_CURRENT_TASK,
  SET_USER_AUTH,
  SET_USER_DATA,
  SET_USER_ERROR,
  SET_USER_MESSAGE,
} from "../consts/consts";

export const setUserAuth = (payload) => {
  return {
    type: SET_USER_AUTH,
    payload,
  };
};

export const setUserData = (payload) => {
  return {
    type: SET_USER_DATA,
    payload,
  };
};
export const setAllTasks = (payload) => {
  return {
    type: SET_ALL_TASKS,
    payload,
  };
};
export const addNewTask = (payload) => {
  return {
    type: ADD_NEW_TASK,
    payload,
  };
};
export const setCurrentTaskAC = (payload) => {
  return {
    type: SET_CURRENT_TASK,
    payload,
  };
};
export const deleteCurrentTaskAC = (payload) => {
  return {
    type: DELETE_CURRENT_TASK,
    payload,
  };
};
export const changeCurrentTaskAC = (payload) => {
  return {
    type: CHANGE_CURRENT_TASK,
    payload,
  };
};
export const deleteSomeTasksAC = (payload) => {
  return {
    type: DELETE_SOME_TASKS,
    payload,
  };
};
export const setUserMessageAC = (payload) => {
  return {
    type: SET_USER_MESSAGE,
    payload,
  };
};
