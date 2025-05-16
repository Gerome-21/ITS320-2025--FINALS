import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo_name: { type: String, required: true },
  todo_description: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['not_started', 'on_going', 'completed'],
    default: 'not_started'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Todo', todoSchema);
