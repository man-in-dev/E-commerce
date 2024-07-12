import express from "express";
import { deleteUser, getAllUsers, getUser, signin, signup, updateUser } from "../controllers/user.js";
import { admin, authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/").get(authenticate, admin, getAllUsers);
router.route("/:id").get(authenticate, admin, getUser);
router.route("/:id").put(authenticate, admin, updateUser);
router.route("/:id").delete(authenticate, admin, deleteUser);

export default router;