const { Schema, model } = require("mongoose");
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});
UserSchema.plugin(autoIncrement.plugin, { model: "User", field: "uId" });
module.exports = model("User", UserSchema);
