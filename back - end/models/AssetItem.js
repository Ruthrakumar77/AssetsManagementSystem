import mongoose from "mongoose";

const assetItemSchema = new mongoose.Schema({
    model: { type: mongoose.Schema.Types.ObjectId, ref: "AssetModel", required: true },
    serialNumber: { type: String, unique: true, required: true },
    purchaseDate: { type: Date, required: true },
    purchaseCost: { type: Number },
    location: { type: String },
    status: {
        type: String,
        enum: ["available", "assigned", "maintenance", "retired"],
        default: "available"
    },

    condition: { type: String, enum: ["new", "good", "fair", "poor"], default: "good" },

}, { timestamps: true });


const AssetItem = mongoose.model("AssetItem", assetItemSchema);

export default AssetItem