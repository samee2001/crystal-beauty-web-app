import express from 'express';
import {createOrder, deleteOrder, getOrder } from '../controllers/orderController.js';
import e from 'express';

const ordeRouter = express.Router();

ordeRouter.post('/', createOrder);
ordeRouter.get('/', getOrder);
ordeRouter.delete('/:orderId', deleteOrder);

export default ordeRouter;
