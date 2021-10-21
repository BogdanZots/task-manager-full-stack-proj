const Router = require("express");
const router = new Router();
const taskController = require("../contollers/task-contoller");
router.post("/", taskController.create);
router.get("/", taskController.getAllTasks);
router.get("/current-task-info/", taskController.getCurrentTask);
router.delete("/", taskController.deleteCurrentTask);
router.delete("/delete-selected-tasks", taskController.deleteSelectedTasks);
router.put("/task-edit/", taskController.editCurrentTask);
module.exports = router;