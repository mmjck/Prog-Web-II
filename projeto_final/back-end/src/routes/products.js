import express from 'express';
// import multer from 'multer';
import productsController from '../controllers/productsController';

// const upload = multer({ dest: 'uploads/' });

const router = express.Router();
router.get('/', productsController.index);
router.post('/', productsController.create);

router.get('/:id', productsController.read);
router.delete('/:id', productsController.remove);
router.put('/:id', productsController.update);

export default router;
