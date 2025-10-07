import { Router } from 'express';

import { destroy, list, show } from 'controllers/accidents';

import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, list);
router.get('/:id([0-9]+)', checkJwt, show);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
