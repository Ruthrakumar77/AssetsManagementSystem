import User from "../models/User.js";
import { createHash } from "../utils/bcrypt.js";

export default async function createSuperAdmin() {
    try {
        let isExists = await User.findOne({ role: "super admin" })
        if (!isExists) {
            const hashedPassword = createHash("superAdmin@123")
            const superAdmin = new User({
                name: "Ruthra",
                email: "ruthrakumard0@gmail.com",
                password: hashedPassword,
                mobile: "9080745689",
                role: "super admin"
            })
            await superAdmin.save()
        }
    } catch (error) {
        console.log(error.message)
    }
}