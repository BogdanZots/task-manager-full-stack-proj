const { Schema, model } = require("mongoose");
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  priority: { type: Object, unique: true, required: true },
  status: { type: Boolean },
  userId: { type: Number, required: true },
});
TaskSchema.plugin(autoIncrement.plugin, { model: "Task", field: "uId" });
module.exports = model("Task", TaskSchema);
