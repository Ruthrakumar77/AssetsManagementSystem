import mongoose from "mongoose";

const assetModelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // "Dell Latitude 7420"

    category: { type: String, required: true }, // "Laptop"

    manufacturer: { type: String },

    depreciationMethod: { type: String, enum: ["straightline", "reducingbalance"], default: "straightline" },

    usefulLifeYears: { type: Number, default: 3 },

    description: { type: String },

}, { timestamps: true });

const AssetModel = mongoose.model("AssetModel", assetModelSchema)

export default AssetModel