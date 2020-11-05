import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classes = new ClassesController();
const connect = new ConnectionsController();

routes.get('/classes', classes.index);
routes.post('/classes', classes.create);

routes.get('/connections', connect.index);
routes.post('/connections', connect.create);


export default routes;