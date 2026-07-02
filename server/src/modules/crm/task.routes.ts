import { Router } from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from './task.controller';
import { authenticate } from '../../shared/middleware/authenticate';

const router = Router();
router.use(authenticate);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
