import express from 'express';
import * as Army from '../controllers/army.controller.js';

const router = express.Router();

router.post('/create', Army.createArmy);
router.post('/delete', Army.removeArmy);

export default router;
