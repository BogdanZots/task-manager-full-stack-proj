import $api from "../api/api";
import { LOGIN_URL, REGISTATION_URL, LOGOUT_URL } from "../consts/consts";

export default class AuthService {
  static async login(email, password) {
    return $api
      .post(LOGIN_URL, { email, password })
      .then((response) => {
        return response.data;
      })
      .catch(function (e) {
        return { status: e.response.status, message: e.response.data.message };
      });
  }
  static async registration(email, password, firstName, lastName) {
    return $api
      .post(REGISTATION_URL, { email, password, firstName, lastName })
      .then((response) => response.data)
      .catch(function (e) {
        return { status: e.response.status, message: e.response.data.message };
      });
  }
  static async logout() {
    return $api.post(LOGOUT_URL);
  }
}
