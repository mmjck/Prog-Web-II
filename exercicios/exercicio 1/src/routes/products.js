import express from "express"
import productsController from "../controllers/productsController";

const router = express.Router();

router.get("products/", productsController.index);

router.get("/:id", productsController.read);
router.post("/", productsController.create);
router.delete("/:id", productsController.remove);
router.put("/:id", productsController.update);


export default router;