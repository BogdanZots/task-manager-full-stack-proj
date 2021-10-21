/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable func-names */
import { API_URL } from "../../api/api";
import "../../services/AuthService";
import AuthService from "../../services/AuthService";
import { setUserAuth, setUserData, setUserMessageAC } from "../actions/actions";
import {
  SET_USER_AUTH,
  SET_USER_DATA,
  SET_USER_MESSAGE,
} from "../consts/consts";
import axios from "axios";

const initialState = {
  isAuth: false,
  email: "",
  firstName: "",
  id: "",
  isActivated: false,
  lastName: "",
  uId: null,
  loginMessage: "",
  registrationMessage: "",
};

const userReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case SET_USER_DATA:
      stateCopy = { ...action.payload, isAuth: stateCopy.isAuth };
      return {
        ...stateCopy,
      };
    case SET_USER_AUTH:
      stateCopy.isAuth = action.payload;
      return {
        ...stateCopy,
      };
    case SET_USER_MESSAGE:
      console.log(action);
      switch (action.payload.type) {
        case "login":
          stateCopy.message = action.payload.message;
          return {
            ...stateCopy,
          };
        case "registration":
          stateCopy.message = action.payload.message;
          return {
            ...stateCopy,
          };
        default:
          return {
            ...stateCopy,
          };
      }
    default:
      return state;
  }
};

export const login = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await AuthService.login(email, password);
      console.log("RESP", response);
      if (response.status === 400 || response.message) {
        dispatch(
          setUserMessageAC({ message: response.message, type: "login" })
        );
        return;
      }
      localStorage.setItem("token", response.accessToken);
      dispatch(setUserAuth(true));
      dispatch(setUserData(response.user));
    } catch (e) {
      console.log(e);
    }
  };
};
export const registration = (email, password, firstName, lastName) => {
  return async function (dispatch) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        firstName,
        lastName
      );
      if (response.message || response.status === 400) {
        dispatch(
          setUserMessageAC({ message: response.message, type: "registration" })
        );
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const logout = (email, password) => {
  return async function (dispatch) {
    try {
      await AuthService.logout(email, password);
      localStorage.removeItem("token");
      dispatch(setUserAuth(false));
      dispatch(setUserData({}));
    } catch (e) {
      console.log(e);
    }
  };
};
export const checkAuth = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setUserAuth(true));
      dispatch(setUserData(response.data.user));
    } catch (e) {
      console.log(e);
    }
  };
};

export default userReducer;
