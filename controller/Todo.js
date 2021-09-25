const Todo = require("../models/Todo");

exports.addTodo = async (req, res) => {
  const { username, title, category } = req.body;

  const todo = new Todo({
    username,
    title,
    category,
  });

  todo.save((error, todo) => {
    if (error) {
      return res.status(400).json({
        message: "bad reqest data not added",
      });
    }

    if (todo) {
      return res.status(201).json({
        message: "Successfully addded a Todo",
        todo,
      });
    }
  });
};

//Get All Todo and also filetr by query

exports.getAllTodo = async (req, res) => {
  const todo = await Todo.find().sort({ createdAt: -1 });
  if (todo.length == 0) {
    res.status(404).json({
      success: false,
      message: `Not Found any Todo Data`,
      todo,
    });
  }

  let key = "";
  for (let k in req.query) {
    key = k;
  }

  if (req.query[key]) {
    req.query[key] == "true" ? (req.query[key] = true) : "";
    req.query[key] == "false" ? (req.query[key] = false) : "";

    const response = await todo.filter((element) => {
      return element[key] == req.query[key];
    });
    if (response.length <= 0) {
      res.status(404).json({
        success: false,
        message: `Not Found ${key} of Todo`,
        todo: response,
      });
    }
    res
      .status(200)
      .json({ success: true, message: `All ${key} of Todo`, todo: response });
  } else {
    res.status(200).json({ success: true, message: "All Todo", todo });
  }
};

exports.getTodoById = async (req, res) => {
  let id = req.params.id;

  try {
    const todo = await Todo.findById({ _id: id });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: `Todo Not found this id:${id}`,
      });
    }

    res.status(200).json({ success: true, todo });
  } catch (err) {
    res.status(404).json({ success: false, message: "data not found", err });
  }
};

//Get by Todo Id 
exports.updateTodo = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });

    if (!todo) {
      res.status(402).json({
        success: false,
        message: `Todo  unsuccessful update this id:${id}`,
      });
    }

    res.status(200).json({ success: true, message: todo });
  } catch (err) {
    // console.log(err);
    res.status(402).json({
      success: false,
      message: `Todo  unsuccessful update this id:${id}`,
      err,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let id = req.params.id;
    const todo = await Todo.findOneAndDelete({ _id: id });
    console.log(todo);
    if (todo) {
      res.status(201).json({ success: true, message: "Todo removed" });
    } else {
      res.status(204).json({ success: false, message: "not deleted todo" });
    }
  } catch (err) {
    res.status(204).json({ success: false, message: "not deleted todo", err });
  }
};
