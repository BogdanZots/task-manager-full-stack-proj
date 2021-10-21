import $api from "../api/api";
import { USERS_URL } from "../consts/consts";

export default class UserService {
  static fetchUsers() {
    return $api.get(USERS_URL);
  }
}
