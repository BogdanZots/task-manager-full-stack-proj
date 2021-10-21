const TaskModel = require("../models/task-model");
/* const bcrypt = require("bcrypt");
const uuid = require("uuid"); */
const taskDto = require("../dtos/task-dto");
const ApiError = require("../exceptions/api-error");
class TaskService {
  async createTask(title, description, dueDate, priority, userId, status) {
    const isPriorityExist = await TaskModel.findOne({ priority });
    if (isPriorityExist) {
      throw ApiError.BadRequest(
        `Таск с приоритетностью ${priority} уже существует`
      );
    }
    const task = await TaskModel.create({
      title,
      description,
      dueDate,
      priority,
      status,
      userId,
    });
    const userDto = new taskDto(task);
    return { ...userDto };
  }
  async getAll(userId) {
    const tasks = await TaskModel.find({ userId });
    return tasks;
  }
  async deleteTask(uId) {
    console.log(uId)
    await TaskModel.deleteOne({ uId });
  }
  async getCurrent(uId) {
    const task = await TaskModel.findOne({ uId });
    return task;
  }
  async editCurrent(uId, data) {
    const taskId = +uId;
    const editedTask = await TaskModel.findOneAndUpdate(
      { uId: taskId },
      {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status,
      },
      { new: true }
    );
    return editedTask;
  }
  async deleteSomeTasks(uId, arrayToDelete) {
    const id = +uId;
    await TaskModel.deleteMany({ userId: id, uId: { $in: arrayToDelete } });
  }
}

module.exports = new TaskService();
