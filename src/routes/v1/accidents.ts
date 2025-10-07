import { Router } from 'express';

import { list } from 'controllers/accidents';

import { destroy } from '../../controllers/accidents';
import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, list);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
