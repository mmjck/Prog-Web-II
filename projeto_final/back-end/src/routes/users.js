import express from 'express';
import addressController from '../controllers/addressController';
import usersController from '../controllers/usersController';

const router = express.Router();

router.get('/', usersController.index);

router.get('/:id', usersController.read);
router.post('/', usersController.create);
router.delete('/', usersController.remove);
router.put('/', usersController.update);

router.get('/:id/address', addressController.create);

export default router;
