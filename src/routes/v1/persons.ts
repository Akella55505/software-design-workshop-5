import { Router } from 'express';

import { destroy, list } from 'controllers/persons';

import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, list);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
