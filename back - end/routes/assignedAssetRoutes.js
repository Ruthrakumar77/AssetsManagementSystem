import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { checkRole } from "../middlewares/checkRole.js";
import { addAssignedAsset, getAllAssinedAssets, getMyAssinedAssets, returnAssignedAsset, updateAssignedAsset } from "../controllers/assignedAssetContoller.js";

const assignedAssetRouter = Router();

// Example route for getting assigned assets
assignedAssetRouter.get("/", (req, res) => {
    res.send("assignedAssetRoutes working");
});

assignedAssetRouter.post("/add", verifyUser, checkRole(["admin", "super admin"]), addAssignedAsset)

assignedAssetRouter.get("/all", verifyUser, checkRole(["admin", "super admin"]), getAllAssinedAssets)

assignedAssetRouter.get("/myassets", verifyUser, getMyAssinedAssets)

assignedAssetRouter.put("/update/:id", verifyUser, checkRole(["admin", "super admin"]), updateAssignedAsset)

assignedAssetRouter.post("/return/:id", verifyUser, checkRole(["admin", "super admin"]), returnAssignedAsset)


export default assignedAssetRouter;