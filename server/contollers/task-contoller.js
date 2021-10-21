const userService = require("../service/user-service");
const ApiError = require("../exceptions/api-error");
const taskService = require("../service/task-service");

class TaskController {
  async create(req, res, next) {
    try {
      const { title, description, dueDate, priority, userId, status } =
        req.body.data;
      console.log("REQ BODY", req.body.data);
      const taskData = await taskService.createTask(
        title,
        description,
        dueDate,
        priority,
        userId,
        status
      );
      console.log("Task Data", taskData);
      return res.json(taskData);
    } catch (e) {
      next(e);
    }
  }
  async getAllTasks(req, res, next) {
    console.log(req.query);
    const userId = req.query.userId;
    try {
      const tasks = await taskService.getAll(userId);
      return res.json(tasks);
    } catch (e) {
      next(e);
    }
  }
  async deleteCurrentTask(req, res, next) {
    console.log(req.query.uId);
    const uId = req.query.uId;
    const deletedTask = await taskService.deleteTask(uId);
    return res.json(deletedTask);
  }
  async getCurrentTask(req, res, next) {
    const uId = req.query.uId;
    const currentTask = await taskService.getCurrent(uId);
    return res.json(currentTask);
  }
  async editCurrentTask(req, res, next) {
    const data = req.body.data;
    const uId = req.query.uId;
    const editedTask = await taskService.editCurrent(uId, data);
    return res.json(editedTask);
  }
  async deleteSelectedTasks(req, res, next) {
    const data = req.body;
    const uId = req.query.uId;
    const deletedTasks = await taskService.deleteSomeTasks(uId, data);
  }
}

module.exports = new TaskController();
