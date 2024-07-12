import express from "express";
import { admin, authenticate } from "../middlewares/authentication.js";
import { createOrder, deleteOrder, getOrder, getOrderById, getOrders, saveOrder, updateOrder, verifyOrder } from "../controllers/order.js";

const router = express.Router();

router.route("/crt-ord").post(authenticate, createOrder);
router.route("/vrf-ord").post(authenticate, verifyOrder);
router.route("/sv-ord").post(authenticate, saveOrder);
router.route("/adm/:id").get(authenticate, admin, getOrderById);
router.route("/adm-ord").get(authenticate, admin, getOrders);
router.route("/usr-ord").get(authenticate, getOrder);
router.route("/upd-ord/:id").put(authenticate, admin, updateOrder);
router.route("/del-ord/:id").delete(authenticate, admin, deleteOrder);

export default router;