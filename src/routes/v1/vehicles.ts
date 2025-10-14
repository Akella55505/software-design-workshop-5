import { Router } from 'express';

import { destroy, list, show, edit, create } from 'controllers/vehicles';

import { checkJwt } from '../../middleware/checkJwt';
import { validatorCreate } from '../../middleware/validation/vehicles/validatorCreate';

const router = Router();

router.get('/', checkJwt, list);
router.get('/:id([0-9]+)', checkJwt, show);
router.post('/', [checkJwt, validatorCreate], create);
router.patch('/:id([0-9]+)', checkJwt, edit);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
