
import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"
import { addAssetItem, deleteAssetItem, editAssetItem, getAssetItems } from "../controllers/assetItemController.js"

const assetItemRouter = express.Router()

//add
assetItemRouter.post("/add", verifyUser, checkRole(["super admin", "admin"]), addAssetItem)

//update (params)
assetItemRouter.put("/edit/:id", verifyUser, checkRole(["super admin", "admin"]), editAssetItem)

//delete (queries)
assetItemRouter.delete("/delete", verifyUser, checkRole(["super admin", "admin"]), deleteAssetItem)

//GET ALL
assetItemRouter.get("/all", verifyUser, getAssetItems)



export default assetItemRouter
