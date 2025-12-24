import AssetItem from "../models/AssetItem.js"
import AssignedAsset from "../models/AssignedAsset.js"
import User from "../models/User.js"

export const addAssignedAsset = async (req, res) => {
    try {
        if (req.body) {
            let assignedBy = req.user._id //admin/superadmin id
            const { assignedTo, assetItem } = req.body
            if (assignedTo && assetItem) { //check required
                let isItem = await AssetItem.findById(assetItem) //find the asset Item
                if (isItem && isItem.status == "available") {
                    let isUser = await User.findById(assignedTo) // find the user
                    if (isUser && isUser.status == "active") {
                        const assignedAsset = new AssignedAsset({ ...req.body, assignedBy }) //make instance
                        await assignedAsset.save() // create assigned asset
                        isItem.status = "assigned"
                        await isItem.save() // update the asset item
                        return res.status(201).send({ message: "Asset Assigned to the user successfully" })
                    } else {
                        return res.status(400).send({ error: "User is Not Valid or Inacitve" })
                    }
                } else {
                    return res.status(400).send({ error: "Asset Is not presents or available" })
                }
            } else {
                return res.status(400).send({ error: "Provide Require Fileds" })
            }
        } else {
            return res.status(400).send({ error: "Body can not be empty" })
        }
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" })
    }
}

export const getAllAssinedAssets = async (req, res) => {
    try {
        const allAssinedAssets = await AssignedAsset.find()
            .populate("assignedTo")
            .populate("assetItem")
            .populate("assignedBy")
            .populate({
                path: "assetItem",
                populate: {
                    path: "model",
                    model: "AssetModel" // <-- your referenced collection name
                }
            })
        return res.status(200).send(allAssinedAssets)
    } catch (error) {
        res.status(500).send({ error: "Something went wrong", message: error.message })
    }
}

export const getMyAssinedAssets = async (req, res) => {
    try {
        const id = req.user._id //auth user's id
        const myAssets = await AssignedAsset.find({ assignedTo: id })
            .populate("assetItem")
            .populate("assignedBy")
            .populate({
                path: "assetItem",
                populate: {
                    path: "model",
                    model: "AssetModel"
                }
            })
        return res.status(200).send(myAssets)
    } catch (error) {
        res.status(500).send({ error: "Something went wrong", message: error.message })
    }
}


export const updateAssignedAsset = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ error: "Body cannot be empty" });
        }

        const { id } = req.params;
        const { assignedTo, assetItem, status, notes } = req.body;
        const assignedBy = req.user._id;

        if (!id) {
            return res.status(400).send({ error: "Id is not valid" });
        }

        const isAssignedAsset = await AssignedAsset.findById(id);
        if (!isAssignedAsset) {
            return res.status(400).send({ error: "Assigned asset not found" });
        }

        // Validate new asset item
        if (assetItem) {
            const isItem = await AssetItem.findById(assetItem);
            if (!isItem || isItem.status !== "available") {
                return res.status(400).send({ error: "Asset is not present or not available" });
            }
        }

        // Validate new assigned user
        if (assignedTo) {
            const isUser = await User.findById(assignedTo);
            if (!isUser || isUser.status !== "active") {
                return res.status(400).send({ error: "User is not valid or inactive" });
            }
        }

        // Update fields
        isAssignedAsset.assignedBy = assignedBy;
        if (assignedTo) isAssignedAsset.assignedTo = assignedTo;
        if (assetItem) isAssignedAsset.assetItem = assetItem;
        if (status) isAssignedAsset.status = status;
        if (notes) isAssignedAsset.notes = notes;

        await isAssignedAsset.save();

        if (assetItem) {
            await AssetItem.findByIdAndUpdate(assetItem, { status: "assigned" });
        }

        return res.status(200).send({ message: "Assigned asset updated successfully" });
    } catch (error) {
        return res.status(500).send({ error: "Something went wrong" });
    }
};


export const returnAssignedAsset = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ error: "Body cannot be empty" });
        }

        const { id } = req.params;
        const { returnDate, conditionOnReturn } = req.body;

        if (!id) {
            return res.status(400).send({ error: "Id is not valid" });
        }

        const isAssignedAsset = await AssignedAsset.findById(id);
        if (!isAssignedAsset) {
            return res.status(400).send({ error: "Assigned asset not found" });
        }

        if (isAssignedAsset.status !== "approved") {
            return res.status(400).send({ error: "Assigned asset can not be returned or already returned" });
        }

        isAssignedAsset.returnDate = returnDate
        isAssignedAsset.conditionOnReturn = conditionOnReturn
        isAssignedAsset.status = "returned"
        await isAssignedAsset.save()

        await AssetItem.findByIdAndUpdate(isAssignedAsset.assetItem, { $set: { status: "available" } })

        return res.status(200).send({ message: "Assined Asset Returned Successfully" })

    } catch (error) {
        return res.status(500).send({ error: "Something went wrong", message: error.message });
    }
};