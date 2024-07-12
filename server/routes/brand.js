import express from "express";
import { admin, authenticate } from "../middlewares/authentication.js";
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/brand.js";

const router = express.Router();

router.route("/").post(authenticate, admin, createBrand);
router.route("/").get(getBrands);
router.route("/:id").get(getBrand);
router.route("/:id").put(authenticate, admin, updateBrand);
router.route("/:id").delete(authenticate, admin, deleteBrand);

export default router;