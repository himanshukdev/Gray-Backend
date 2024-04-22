const mongoose = require('mongoose');
const taskService = require('../services/task.service');

const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    await taskService.create({ title, description });

    return res.status(200).send({ data: 'success', error: null });
  } catch (error) {
    if (error.keyValue.title === title) {
      return res.status(400).send({ data: 'failure', error: 'duplicate title' });
    }
    return res.status(500).send({ data: 'failure', error: 'Internal server error' });
  }
};
const getAllTask = async (req, res) => {
  try {
    const tasks = await taskService.getAll();
    if (!tasks) {
      return res.status(200).send({ data: [], error: null });
    }
    return res.status(200).send({ data: tasks, error: null });
  } catch (error) {
    return res.status(500).send({ data: null, error: 'internal server error' });
  }
};
const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  if (mongoose.isValidObjectId(taskId)) {
    try {
      const task = await taskService.getById(taskId);
      if (!task) {
        return res.status(400).send({ data: null, error: 'No task found by the id' });
      }
      return res.status(200).send({ data: task, error: null });
    } catch (error) {
      return res.status(500).send({ data: null, error: 'internal server error' });
    }
  }
  return res.status(400).send({ data: null, error: 'id is not valid' });
};
const deleteTaskById = async (req, res) => {
  const taskId = req.params.id;

  if (mongoose.isValidObjectId(taskId)) {
    try {
      const deleteTask = await taskService.deleteById(taskId);
      if (!deleteTask) {
        return res.status(400).send({ data: null, error: 'No task found by the id' });
      }
      return res.status(200).send({ data: 'success', error: null });
    } catch (error) {
      return res.status(500).send({ data: null, error: 'internal server error' });
    }
  }
  return res.status(400).send({ data: null, error: 'id is not valid' });
};
const updateTask = async (req, res) => {
  const taskId = req.params.id;

  if (mongoose.isValidObjectId(taskId)) {
    try {
      const { status } = req.body;

      const task = await taskService.getById(taskId);

      if (!task) {
        return res.status(400).send({ data: null, error: 'No task found by the id' });
      }

      const updatedTask = await taskService.updateById(taskId, {
        status,
      });

      return res.status(200).send({ data: updatedTask, error: null });
    } catch (error) {
      return res.status(500).send({ data: null, error: 'internal server error' });
    }
  }
  return res.status(400).send({ data: null, error: 'id is not valid' });
};

module.exports = {
  addTask,
  getAllTask,
  getTaskById,
  deleteTaskById,
  updateTask,
};

