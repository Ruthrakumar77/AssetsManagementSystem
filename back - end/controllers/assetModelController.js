import mongoose from "mongoose"
import AssetItem from "../models/AssetItem.js"
import AssetModel from "../models/AssetModel.js"

const sendSuccess = (res, status = 200, payload = {}) => res.status(status).json(payload)
const sendError = (res, status = 500, message = "Something went wrong", error = null) => {
    const body = { error: message }
    if (error) body.details = error.message
    return res.status(status).json(body)
}

const isEmptyBody = (body) => !body || Object.keys(body).length === 0

export const addAssetModel = async (req, res) => {
    try {
        if (isEmptyBody(req.body)) return sendError(res, 400, "Body cannot be empty")

        const name = (req.body.name || "").toString().trim()
        if (!name) return sendError(res, 400, "Asset model name is required")

        const exists = await AssetModel.findOne({ name }).lean()
        if (exists) return sendError(res, 409, "AssetModel Already Exists")

        await AssetModel.create({ ...req.body, name })
        return sendSuccess(res, 201, { message: "AssetModel Created" })
    } catch (error) {
        return sendError(res, 500, "Something went wrong", error)
    }
}

export const editAssetModel = async (req, res) => {
    try {
        if (isEmptyBody(req.body)) return sendError(res, 400, "Body cannot be empty")

        const { id } = req.params
        if (!id || !mongoose.isValidObjectId(id)) return sendError(res, 400, "Invalid id")

        const updated = await AssetModel.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true, runValidators: true })
        if (!updated) return sendError(res, 400, "Asset Model Not Found")

        return sendSuccess(res, 200, { message: "Asset Model Updated" })
    } catch (error) {
        return sendError(res, 500, "Something went wrong", error)
    }
}

export const deleteAssetModel = async (req, res) => {
    try {
        const id = req.query.id
        if (!id || !mongoose.isValidObjectId(id)) return sendError(res, 400, "Invalid id")

        const model = await AssetModel.findById(id).lean()
        if (!model) return sendError(res, 400, "Asset Model Not Found")

        const usedItem = await AssetItem.findOne({ model: id }).lean()
        if (usedItem) return sendError(res, 400, "Can not delete the model used for items")

        await AssetModel.findByIdAndDelete(id)
        return sendSuccess(res, 200, { message: "Asset Model is Deleted" })
    } catch (error) {
        return sendError(res, 500, "Something went wrong", error)
    }
}

export const getAssetModels = async (req, res) => {
    try {
        const all = await AssetModel.find().lean()
        return sendSuccess(res, 200, all)
    } catch (error) {
        return sendError(res, 500, "Something went wrong", error)
    }
}

export const getAssetModelsWithItems = async (req, res) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    localField: "_id",
                    from: "assetitems",
                    foreignField: "model",
                    as: "items",
                },
            },
        ]
        const all = await AssetModel.aggregate(pipeline)
        return sendSuccess(res, 200, all)
    } catch (error) {
        return sendError(res, 500, "Something went wrong", error)
    }
}

export const getItemsOfTheModel = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.isValidObjectId(id)) return sendError(res, 400, "Invalid id")

        const pipeline = [
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    localField: "_id",
                    from: "assetitems",
                    foreignField: "model",
                    as: "items",
                },
            },
        ]
        const result = await AssetModel.aggregate(pipeline)
        if (!result || result.length === 0) return sendError(res, 400, "Asset Model Not Found")

        return sendSuccess(res, 200, result[0])
    } catch (error) {
        return sendError(res, 500, "Something went wrong", error)
    }
}