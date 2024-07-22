import { Router } from 'express';
import { getTasksByUser, getTaskById, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { createTaskSchema } from '../schemas/task.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/tasks', authRequired, getTasksByUser);

router.get('/tasks/:id', authRequired, getTaskById);

router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);

router.put('/tasks/update/:id', authRequired, updateTask);

router.delete('/tasks/delete/:id', authRequired, deleteTask);

export default router;