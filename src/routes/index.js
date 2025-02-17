import { Router } from "express";
import * as FormController from "../controllers/form.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Bem vindo!" });
});

router.get("/get-items", FormController.getItems);

export default router;
