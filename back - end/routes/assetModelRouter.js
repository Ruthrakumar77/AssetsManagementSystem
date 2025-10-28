import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { addAsset } from "../controllers/assetController.js"
import { checkRole } from "../middlewares/checkRole.js"

const assetModelRouter = express.Router()

// demo
assetModelRouter.get("/", (req, res) => res.send({ message: "asset router is working" }))


// add 
assetModelRouter.post("/add", verifyUser, checkRole(["admin", "super admin"]), addAsset)




export default assetModelRouter