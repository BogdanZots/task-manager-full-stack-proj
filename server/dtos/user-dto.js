module.exports = class UserDto {
  email;
  id;
  uId;
  firstName;
  lastName;
  isActivated;
  userId

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.uId = model.uId;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.userId = model.userId;
  }
};
