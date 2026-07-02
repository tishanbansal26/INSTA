import { Router } from 'express';
import * as controller from './controller';

const router = Router();
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
