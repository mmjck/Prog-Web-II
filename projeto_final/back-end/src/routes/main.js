import express from "express"
import mainController from "../controllers/mainController"

const router = express.Router();

router.post("/login", mainController.login);
router.delete("/logout", mainController.logout);

export default router;