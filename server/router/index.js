const Router = require("express").Router;
const userController = require("../contollers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = new Router();
const tasksRouter = require("../router/tasksRouter");
const { body } = require("express-validator");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

router.use("/tasks", tasksRouter);

module.exports = router;
