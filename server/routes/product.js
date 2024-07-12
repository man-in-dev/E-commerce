import express from "express";
import { admin, authenticate } from "../middlewares/authentication.js";
import { createProduct, deleteProduct, filterProduct, getProduct, getProducts, searchProduct, updateProduct } from "../controllers/product.js";

const router = express.Router();

router.route("/").post(authenticate, admin, createProduct);
router.route("/").get(getProducts);
router.route("/filter-prod").get(filterProduct);
router.route("/search").get(searchProduct);
router.route("/:id").get(getProduct);
router.route("/:id").put(authenticate, admin, updateProduct);
router.route("/:id").delete(authenticate, admin, deleteProduct);

export default router;