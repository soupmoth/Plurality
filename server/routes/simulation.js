import express from 'express';

import { getConstituencies} from '../controllers/simulation.js';

const router = express.Router();

router.get('/', getConstituencies)

export default router;