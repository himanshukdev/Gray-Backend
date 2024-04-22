const Router = require('express').Router();
const passport = require('passport');

const {
  addTask,
  getAllTask,
  getTaskById,
  deleteTaskById,
  updateTask,
} = require('../controllers/task.controller');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

Router.get('/all-task',  getAllTask);
Router.get('/get-task/:id',  getTaskById);
Router.post('/add-task',  addTask);
Router.put('/update-task/:id',  updateTask);
Router.delete('/delete-task/:id', deleteTaskById);

module.exports = Router;
