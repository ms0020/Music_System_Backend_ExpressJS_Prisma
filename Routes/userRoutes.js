import { Router } from "express";
import { createUser, fetchUsers, fetchUserById, updateUser, deleteUser } from '../Controller/UserController.js';


const router = Router();

router.post("/", createUser);
router.post("/all_users", fetchUsers);
router.post("/:id/user_by_id", fetchUserById);
router.put("/:id/update_user", updateUser);
router.delete("/:id/delete_by_id", deleteUser);


export default router;