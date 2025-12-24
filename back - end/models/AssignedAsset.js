import { Schema, model } from "mongoose";

const assignedAssetSchema = new Schema({
    assetItem: { type: Schema.Types.ObjectId, ref: "AssetItem", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "users", required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    assignedDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    conditionOnReturn: { type: String, enum: ["new", "good", "fair", "poor"] },
    notes: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected", "returned"], default: "pending" }
}, { timestamps: true });

const AssignedAsset = model("AssignedAsset", assignedAssetSchema);

export default AssignedAsset;