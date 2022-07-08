import express from 'express';

import { getParties} from '../controllers/simulation.js';

const router = express.Router();

router.get('/', getParties)

export default router;