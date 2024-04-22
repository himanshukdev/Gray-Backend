const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['TODO', 'INPROGESS', 'COMPLETED', 'DEADLINED'],
      default: 'TODO',
    },
  },
  {
    timestamps: true,
  },
);

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;
