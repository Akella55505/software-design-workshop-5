import { Router } from 'express';

import { destroy, list, show, edit, create } from 'controllers/accidents';

import { checkJwt } from '../../middleware/checkJwt';
import { validatorCreate } from '../../middleware/validation/accidents/validatorCreate';
import { validatorEdit } from '../../middleware/validation/accidents/validatorEdit';

const router = Router();

router.get('/', checkJwt, list);
router.get('/:id([0-9]+)', checkJwt, show);
router.post('/', [checkJwt, validatorCreate], create);
router.patch('/:id([0-9]+)', [checkJwt, validatorEdit], edit);
router.delete('/:id([0-9]+)', checkJwt, destroy);

export default router;
