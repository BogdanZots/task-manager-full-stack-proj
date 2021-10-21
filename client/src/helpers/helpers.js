import { ACTIVE_PAGE, COMPLETED_PAGE } from "../consts/consts";

export const checkInputFields = (title, description, dueDate, priority) => {
  if (!title || !description || !dueDate || !priority) {
    return false;
  }
  if (
    title.length >= 3 &&
    description.length >= 3 &&
    dueDate &&
    typeof (priority === "number") &&
    priority !== 0
  ) {
    return true;
  }
};

export const selectAllTasks = (page, iteratedArray, arr, cb) => {
  if (page === ACTIVE_PAGE) {
    iteratedArray.forEach((item, i) => {
      const taskId = iteratedArray[i].uId;
      arr.indices.push(i);
      arr.identifiers.push(taskId);
      cb({
        indices: [...new Set([...arr.indices])],
        identifiers: [...new Set([...arr.identifiers])],
        page: page,
      });
    });
  }
  if (page === COMPLETED_PAGE) {
    iteratedArray.forEach((item, i) => {
      const taskId = iteratedArray[i].uId;
      arr.indices.push(i);
      arr.identifiers.push(taskId);
      cb({
        indices: [...new Set([...arr.indices])],
        identifiers: [...new Set([...arr.identifiers])],
        page: page,
      });
    });
  }
};
export const loginValidator = (login, pass) => {
  const errorsArr = [];
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
    errorsArr.push("Email must contains @ and .");
  }
  if (pass.length <= 2) {
    errorsArr.push("Password length mush be more than 3");
  }
  if (errorsArr.length) {
    return false;
  }
  return true;
};
export const passwordValidator = (firstName, lastName, login, pass) => {
  console.log(firstName, lastName, login, pass);
  const errorsArr = [];
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
    errorsArr.push("Email must contains @ and .");
  }
  if (firstName.length < 1) {
    errorsArr.push("first name can't be empty");
  }
  if (lastName.length < 1) {
    errorsArr.push("last name can't be empty");
  }
  if (pass.length <= 2) {
    errorsArr.push("Password length mush be more than 3");
  }
  if (errorsArr.length) {
    return false;
  }
  return true;
};
