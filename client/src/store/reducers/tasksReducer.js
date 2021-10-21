/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable func-names */
import { API_URL } from "../../api/api";
import "../../services/AuthService";
import AuthService from "../../services/AuthService";
import {
  addNewTask,
  changeCurrentTaskAC,
  deleteCurrentTaskAC,
  deleteSomeTasksAC,
  setAllTasks,
  setCurrentTaskAC,
  setUserAuth,
  setUserData,
} from "../actions/actions";
import {
  ADD_NEW_TASK,
  CHANGE_CURRENT_TASK,
  DELETE_CURRENT_TASK,
  DELETE_SOME_TASKS,
  SET_ACTIVE_TASKS,
  SET_ALL_TASKS,
  SET_CURRENT_TASK,
} from "../consts/consts";
import axios from "axios";
import TasksService from "../../services/TasksService";
import { ACTIVE_PAGE, COMPLETED_PAGE } from "../../consts/consts";

const initialState = {
  activeTasks: [],
  completedTasks: [],
  currentTask: {},
};

const tasksReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case SET_ALL_TASKS:
      stateCopy.activeTasks = action.payload.filter(
        (task) => task.status === false
      );
      stateCopy.completedTasks = action.payload.filter(
        (task) => task.status === true
      );
      return {
        ...stateCopy,
      };
    case ADD_NEW_TASK:
      stateCopy.activeTasks.push(action.payload);
      return {
        ...stateCopy,
      };
    case SET_CURRENT_TASK:
      stateCopy.currentTask = action.payload;
      return {
        ...stateCopy,
      };
    case DELETE_CURRENT_TASK:
      const activeTask = stateCopy.activeTasks.filter(
        (task) => task.uId !== action.payload
      );
      const completedTask = stateCopy.completedTasks.filter(
        (task) => task.uId !== action.payload
      );
      if (activeTask) {
        stateCopy.activeTasks = activeTask;
      }
      if (completedTask) {
        stateCopy.completedTasks = completedTask;
      }
      return {
        ...stateCopy,
      };
    case CHANGE_CURRENT_TASK:
      return {
        ...stateCopy,
      };
    case DELETE_SOME_TASKS:
      if (action.payload.page === ACTIVE_PAGE) {
        let count = 0;
        const newActiveTasks = stateCopy.activeTasks.filter((task, i) => {
          if (i === action.payload.tasksIndices.indices.sort((a, b) => a - b)[count]) {
            ++count;
            return false;
          }
          return true;
        });
        stateCopy.activeTasks = newActiveTasks;
      }
      if (action.payload.page === COMPLETED_PAGE) {
        let count2 = 0;
        const newCompletedTasks = stateCopy.completedTasks.filter((task, i) => {
          if (i === action.payload.tasksIndices.indices.sort((a, b) => a - b)[count2]) {
            ++count2;
            return false;
          }
          return true;
        });
        stateCopy.completedTasks = newCompletedTasks;
      }
      return {
        ...stateCopy,
      };
    default:
      return state;
  }
};
export const addTask = (newTaskData) => {
  return async function (dispatch) {
    const task = await TasksService.postNewTask(newTaskData);
    dispatch(addNewTask(task.data));
  };
};
export const getTasks = (userId) => {
  return async function (dispatch) {
    try {
      const tasks = await TasksService.getTasks(userId);
      dispatch(setAllTasks(tasks.data));
    } catch (e) {
      dispatch(setAllTasks([]));
    }
  };
};
export const deleteTask = (uId) => {
  return async function (dispatch) {
    await TasksService.deleteTask(uId);
    dispatch(deleteCurrentTaskAC(uId));
  };
};
export const setCurrentTask = (uId) => {
  return async function (dispatch) {
    const currentTask = await TasksService.getCurrentTask(uId);
    dispatch(setCurrentTaskAC(currentTask.data));
  };
};
export const changeCurrentTask = (uId, data) => {
  return async function (dispatch) {
    const currentTask = await TasksService.putCurrentTask(uId, data);
    dispatch(changeCurrentTaskAC(currentTask));
  };
};
export const deleteSelectedTasks = (uId, tasksIndices, page) => {
  return async function (dispatch) {
    dispatch(deleteSomeTasksAC({ tasksIndices, page }));
    await TasksService.deleteSelectedTasks(uId, tasksIndices.identifiers);
  };
};
export default tasksReducer;
