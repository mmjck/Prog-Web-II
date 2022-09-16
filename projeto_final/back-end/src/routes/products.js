import express from 'express';
import multer from 'multer';
import productsController from '../controllers/productsController';

import config from '../controllers/multer';

const router = express.Router();
router.get('/', productsController.index);
router.post('/', productsController.create);
router.post(
  '/upload',
  multer(config).single('file'),
  productsController.uploadImage
);

router.get('/:id', productsController.read);
router.delete('/:id', productsController.remove);
router.put('/:id', productsController.update);

export default router;
