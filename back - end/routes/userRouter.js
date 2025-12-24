import express from "express"
import { addUser, changePass, deleteUser, editUser, getAllAdmins, getAllEmployees, updateUser } from "../controllers/userController.js"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"


const userRouter = express.Router()

//demo 
userRouter.get("/", (req, res) => res.send({ message: "user router is working" }))

// add
userRouter.post("/add/employee", verifyUser, checkRole(["admin", "super admin"]), addUser)

userRouter.post("/add/admin", verifyUser, checkRole(["super admin"]), addUser)

// read
userRouter.get("/read/employees", verifyUser, checkRole(["admin", "super admin"]), getAllEmployees)

userRouter.get("/read/admins", verifyUser, checkRole(["super admin"]), getAllAdmins)

// edit
userRouter.put("/edit/employee", verifyUser, checkRole(["admin", "super admin"]), editUser)

userRouter.put("/edit/admin", verifyUser, checkRole(["super admin"]), editUser)

// delete
userRouter.delete("/delete/employee", verifyUser, checkRole(["admin", "super admin"]), deleteUser)

userRouter.delete("/delete/admin", verifyUser, checkRole(["super admin"]), deleteUser)

// update
userRouter.put("/update", verifyUser, updateUser)  // user profile own updates

// update password (using current password)
userRouter.patch("/changepass", verifyUser, changePass)



export default userRouter   