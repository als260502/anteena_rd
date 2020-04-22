const { Router } = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const AuthMiddleware = require('./app/middlewares/AuthMiddleware');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const DashboardController = require('./app/controllers/DashboardController');
const AccessPointController = require('./app/controllers/AccessPointController.js');

const routes = Router();

routes.post('/session', SessionController.store);

routes.post('/user/create', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),

}), UserController.store);

routes.get('/user/edit/:id', AuthMiddleware, UserController.index);
routes.patch('/user/update/:id', AuthMiddleware, UserController.update);

routes.get('/dashboard', AuthMiddleware, DashboardController.index);
routes.post('/dashboard/ap/create', AuthMiddleware, AccessPointController.store);

module.exports = routes;
