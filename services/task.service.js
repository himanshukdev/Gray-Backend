const TaskModel = require('../models/task.model');

const create = async (taskPayload) => {
  const createdTask = await TaskModel.create(taskPayload);
  return createdTask;
};

const getAll = async () => {
  const tasks = await TaskModel.find().select('_id title description status updatedAt');
  return tasks;
};

const getById = async (taskId) => {
  const task = await TaskModel.findById(taskId).select('_id title author summary');
  return task;
};

const updateById = async (taskId, updatePayload) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updatePayload, {
    new: true,
  });
  return updatedTask;
};

const deleteById = async (taskId) => {
  const deleteTask = await TaskModel.findByIdAndDelete(taskId);
  return deleteTask;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
