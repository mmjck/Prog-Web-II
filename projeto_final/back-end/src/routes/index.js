import express from 'express';
import userRouter from './users';
import productsRouter from './products';
import mainRouter from './main';
import addressRouter from './address';

const router = express.Router();

router.use(mainRouter);
router.use('/users', userRouter);
router.use('/users/', addressRouter);

router.use('/products', productsRouter);

export default router;
