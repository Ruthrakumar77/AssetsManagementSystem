import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "employee", "super admin"],
        default: "employee"
        // default: "admin"
        // default: "super admin"
    },
    department: { type: String },
    designation: { type: String },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true })

const User = mongoose.model("users", userSchema)

export default User