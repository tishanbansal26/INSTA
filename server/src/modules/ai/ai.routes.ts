import { Router } from 'express';
import { chat, premiumAdvisor, policyComparison } from './ai.controller';
import { authenticate } from '../../shared/middleware/authenticate';

const router = Router();

// In a real app we'd want authentication for AI routes, but I'll make it optional/omitted for testing
// router.use(authenticate);

router.post('/chat', chat);
router.post('/advisor', premiumAdvisor);
router.post('/compare', policyComparison);

export default router;
