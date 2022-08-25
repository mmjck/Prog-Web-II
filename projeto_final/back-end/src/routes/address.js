import express from 'express';
import addressController from '../controllers/addressController';

const router = express.Router();

router.post('/:id/address', addressController.create);
router.get('/:id/address/list', addressController.listAddress);

router.get('/:userId/address/:id', addressController.read);
router.put('/:userId/address/:id', addressController.update);
router.delete('/:userId/address/:id', addressController.remove);

export default router;
