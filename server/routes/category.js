import express from "express";
import { admin, authenticate } from "../middlewares/authentication.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.js";

const router = express.Router();

router.route("/").post(authenticate, admin, createCategory);
router.route("/").get(getCategories);
router.route("/:id").get(getCategory);
router.route("/:id").put(authenticate, admin, updateCategory);
router.route("/:id").delete(authenticate, admin, deleteCategory);

export default router;