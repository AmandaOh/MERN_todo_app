import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  id: Number,
  todo: String
});

export default TodoSchema;
