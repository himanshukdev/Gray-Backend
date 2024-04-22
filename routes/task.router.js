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

Router.get('/all-task', isAuthenticated, getAllTask);
Router.get('/get-task/:id', isAuthenticated, getTaskById);
Router.post('/add-task', isAuthenticated, addTask);
Router.put('/update-task/:id', isAuthenticated, updateTask);
Router.delete('/delete-task/:id', isAuthenticated, deleteTaskById);

module.exports = Router;
