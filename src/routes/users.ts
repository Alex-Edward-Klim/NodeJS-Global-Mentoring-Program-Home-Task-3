import express from 'express';

import usersController from '../controllers/usersController';
import routesGlobalErrorHandler from './routesGlobalErrorHandler';

const router = express.Router();

router.get('/', routesGlobalErrorHandler(usersController.users_get_all));
router.get('/:id', routesGlobalErrorHandler(usersController.users_get_user));
router.post('/', routesGlobalErrorHandler(usersController.users_create_user));
router.patch('/:id', routesGlobalErrorHandler(usersController.users_update_user));
router.delete('/:id', routesGlobalErrorHandler(usersController.users_delete_user));

export default router;
