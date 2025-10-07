import { Router } from 'express';

import accidents from './accidents';
import auth from './auth';
import persons from './persons';
import users from './users';
import vehicles from './vehicles';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/accidents', accidents);
router.use('/persons', persons);
router.use('/vehicles', vehicles);

export default router;
