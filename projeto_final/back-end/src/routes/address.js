import express from 'express';
import addressController from '../controllers/addressController';

const router = express.Router();

router.get('/:id/address/list', addressController.listAddress);
router.post('/:id/address', addressController.create);

export default router;
