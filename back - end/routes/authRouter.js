import express from "express"
import { authStatus, loginUser, userLogout } from "../controllers/authController.js"
import { verifyUser } from "../middlewares/verifyUser.js";

const authRouter = express.Router()

// demo
authRouter.get("/", (req, res) => res.send({ message: "auth router is working" }))


// login
authRouter.post("/login", loginUser);

// check user
authRouter.get('/status', verifyUser, authStatus)

// logout
authRouter.get('/logout', userLogout)


export default authRouter