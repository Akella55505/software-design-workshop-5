import { Router } from 'express';

import { list } from 'controllers/vehicles';

import { destroy } from '../../controllers/vehicles';
import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, list);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
