import mongoose from "mongoose";

const assetModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    manufacturer: { type: String },
    depreciationMethod: {
        type: String,
        enum: ["staright_line", "reducing_balance"],
        default: "staright_line"
    },
    usefulLifeYears: { type: Number, default: 3 },
    description: { type: String },
}, { timestamps: true })  // this timeStamps will create 2 default field (created,updated)

const AssetModel = mongoose.model("AssetModel", assetModelSchema)
export default AssetModel