import { Router } from "express";
import * as FormController from "../controllers/form.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Bem vindo!" });
});

router.get("/get-items/?:page", FormController.getFormItems);
router.post("/create-item", FormController.createItem);
router.put("/edit-item", FormController.editItem);

export default router;
