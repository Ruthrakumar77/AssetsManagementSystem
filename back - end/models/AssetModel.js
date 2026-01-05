import mongoose from "mongoose";

const assetModelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // "Dell Latitude 7420"

    category: { type: String, required: true }, // "Laptop"

    manufacturer: { type: String },

    depreciationMethod: { type: String, enum: ["straight_line", "reducing_balance"], default: "straight_line", required: true },

    usefulLifeYears: { type: Number, default: 3 },

    description: { type: String },

}, { timestamps: true });

const AssetModel = mongoose.model("AssetModel", assetModelSchema)

export default AssetModel