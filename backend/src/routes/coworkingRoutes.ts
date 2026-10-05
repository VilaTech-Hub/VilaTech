import { Router } from 'express';
import { submitCoworkingQuote } from '../controllers/CoworkingController';

const router = Router();

router.post('/quote', submitCoworkingQuote);

export default router;
