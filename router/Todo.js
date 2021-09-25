const express = require("express");
const router = express.Router();
const {
  getAllTodo,
  addTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controller/Todo");

router.get("/", getAllTodo);
router.post("/add", addTodo);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
