import express from "express" 
import userRouter from "./users"
import productsRouter from "./products"

const router = express.Router()

router.use("/users" , userRouter);
router.use("/products" , productsRouter);

export default router;