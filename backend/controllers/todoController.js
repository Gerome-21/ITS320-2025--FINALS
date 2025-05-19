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
