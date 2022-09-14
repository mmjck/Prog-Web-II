import express from 'express';
import addressController from '../controllers/addressController';
import usersController from '../controllers/usersController';
import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/', usersController.index);

router.get('/:id', usersController.read);
router.post('/', usersController.create);
router.delete('/', usersController.remove);
router.put('/', usersController.update);
router.get('/:id/collaborators', usersController.listAllCollaborators);

router.get('/:id/address', addressController.create);

router.post('/:id/orders', orderController.create);
router.get('/:id/orders', orderController.read);

export default router;
