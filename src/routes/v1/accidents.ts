import { Router } from 'express';

import { destroy, list, show, edit, create } from 'controllers/accidents';

import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, list);
router.get('/:id([0-9]+)', checkJwt, show);
router.post('/', checkJwt, create);
router.patch('/:id([0-9]+)', checkJwt, edit);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
