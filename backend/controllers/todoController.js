import Todo from '../models/todoModel.js';

export const createTodo = async (req, res) => {
  try {
    const { todo_name, todo_description, category_id, status } = req.body;

    const todo = new Todo({
      todo_name,
      todo_description,
      category_id,
      status,
      created_by: req.userId,
    });

    await todo.save();

    res.status(201).json({ message: 'Todo item created successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo item', error: error.message });
  }
};
export const getTodosByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const todos = await Todo.find({ category_id: categoryId }).populate('created_by', 'username');

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { todo_name, todo_description, status } = req.body;

    const updated = await Todo.findOneAndUpdate(
      { _id: todoId, created_by: req.userId },
      { todo_name, todo_description, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated", todo: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo item', error: error.message });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const deleted = await Todo.findOneAndDelete({ _id: todoId, created_by: req.userId });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo item', error: error.message });
  }
};

// ✅ added this missing closing brace here ⬆️

export const getCompletedTodos = async (req, res) => {
  try {
    const completedTodos = await Todo.find({ created_by: req.userId, status: 'completed' });

    res.status(200).json(completedTodos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed todos', error: error.message });
  }
};
