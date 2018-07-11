import mongoose from 'mongoose';

const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
  id: Number,
  todo: String
});

export default TodoSchema;
