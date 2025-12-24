// import express from "express"
// import { verifyUser } from "../middlewares/verifyUser.js"
// import { addAsset } from "../controllers/assetController.js"
// import { checkRole } from "../middlewares/checkRole.js"

// const assetModelRouter = express.Router()

// // demo
// assetModelRouter.get("/", (req, res) => res.send({ message: "asset router is working" }))


// // add 
// assetModelRouter.post("/add", verifyUser, checkRole(["admin", "super admin"]), addAsset)

// export default assetModelRouter


import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"
import { addAssetModel, deleteAssetModel, editAssetModel, getAssetModels, getAssetModelsWithItems, getItemsOfTheModel } from "../controllers/assetModelController.js"

const assetModelRouter = express.Router()

//add
assetModelRouter.post("/add", verifyUser, checkRole(["super admin", "admin"]), addAssetModel)

//update (params)
assetModelRouter.put("/edit/:id", verifyUser, checkRole(["super admin", "admin"]), editAssetModel)

//delete (queries)
assetModelRouter.delete("/delete", verifyUser, checkRole(["super admin", "admin"]), deleteAssetModel)

//GET ALL
assetModelRouter.get("/all", verifyUser, getAssetModels)

//get all with items
assetModelRouter.get("/all/items", verifyUser, getAssetModelsWithItems)

//get asset model with items
assetModelRouter.get("/:id", verifyUser, getItemsOfTheModel)

export default assetModelRouter
