import $api from "../api/api";
import { TASK_INFO_URL, DELETE_TASK_URL, USER_TASKS_URL, TASKS_URL, EDIT_TASK_URL, DELETE_SELECTED_TASKS } from "../consts/consts";

export default class TasksService {
  static postNewTask(newTaskData) {
    return $api.post(TASKS_URL, { data: newTaskData });
  }
  static getTasks(userId) {
    return $api.get(`${USER_TASKS_URL}${userId}`);
  }
  static deleteTask(uId) {
    return $api.delete(`${DELETE_TASK_URL}${uId}`);
  }
  static getCurrentTask(uId) {
    return $api.get(`${TASK_INFO_URL}${uId}`);
  }
  static putCurrentTask(uId, data) {
    return $api.put(`${EDIT_TASK_URL}${uId}`, { data: data });
  }
  static deleteSelectedTasks(uId, data) {
    console.log(data)
    return $api.delete(`${DELETE_SELECTED_TASKS}${uId}`, { data: data });
  }
}
