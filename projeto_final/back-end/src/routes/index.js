import express from "express" 
import userRouter from "./users"
import productsRouter from "./products"
import mainRouter from "./main"

const router = express.Router()


router.use(mainRouter);
router.use("/users" , userRouter);
router.use("/products" , productsRouter);

export default router;