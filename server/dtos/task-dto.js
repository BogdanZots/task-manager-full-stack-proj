module.exports = class TaskDto {
  title;
  description;
  dueDate;
  priority;
  uId;
  status;

  constructor(model) {
    this.title = model.title;
    this.description = model.description;
    this.uId = model.uId;
    this.dueDate = model.dueDate;
    this.priority = model.priority;
    this.status = model.status;
  }
};
