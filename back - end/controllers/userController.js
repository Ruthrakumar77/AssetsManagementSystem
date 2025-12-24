import User from "../models/User.js"
import { comparePassword, createHash } from "../utils/bcrypt.js"

export async function addUser(req, res) {
    try {
        // body data
        const { name, email, mobile, role } = req.body
        if (name && email && mobile) {
            const isUser = await User.findOne({ email })


            if (isUser) {
                return res.status(400).send({ message: "User Already Exists" })
            } else {
                // add
                const hashedPassword = createHash("mypassword@#$!")
                const userDetails = new User({ ...req.body, role: role || "employee", password: hashedPassword })
                await userDetails.save()
                return res.status(201).send({ message: "User Created" })
            }
        } else {
            return res.status(400).send({ message: "Provide all required fields" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        })
    }
}

export async function updateUser(req, res) {
    try {
        const user = req.user  // coming from verify user middleware
        if (!req.body) {
            return res.status(400).send({ message: "No Data Provided" })
        } else {
            const { name, mobile } = req.body
            user.name = name ? name : user.name
            user.mobile = mobile ? mobile : user.mobile
            await user.save()
            return res.status(200).send({ message: "User Data Updated" })
        }
    } catch (error) {
        return res.status(500).send({ message: "server error", error: error.message })
    }
}

export async function changePass(req, res) {
    try {
        const { user } = req  // coming from verifyUser middlewares
        if (!req.body) {
            return res.status(400).send({ message: "No Data Provided" })
        } else {
            const { currentPassword, newPassword } = req.body
            if (currentPassword && newPassword) {
                const isMatched = comparePassword(currentPassword, user.password)
                if (isMatched) {
                    // hash the new password
                    const hashedPassword = createHash(newPassword)
                    user.password = hashedPassword  // update the user password
                    await user.save()
                    return res.status(200).send({ message: " Password updated successfully" })
                } else {
                    return res.status(400).send({ message: " Incorrect Password" })
                }
            } else {
                return res.status(400).send({ message: " Provide all the fields" })
            }
        }
    } catch (error) {
        return res.status(500).send({ message: "something went wrong", error: error.message })
    }
}

export async function getAllEmployees(req, res) {
    try {
        const employees = await User.find({ role: "employee" }).select("-password -updatedAt -createdAt -__v")
        if (!employees || employees.length === 0) {
            return res.send({ message: "No employees found" })
        }
        return res.status(200).send(employees)
    } catch (error) {
        return res.status(500).send({
            message: "Something went Wrong",
            error: error.message
        })
    }
}

export async function getAllAdmins(req, res) {
    try {
        const admins = await User.find({ role: "admin" }).select("-password -updatedAt -createdAt -__v")
        return res.status(200).send(admins)
    } catch (error) {
        return res.status(500).send({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

export async function editUser(req, res) {
    try {
        const { userid } = req.headers;

        if (userid) {
            let user = await User.findById(userid)
            if (req.body === undefined) return res.status(400).send({ error: "Provide any body Details" })

            if (user) {
                await User.findByIdAndUpdate(userid, { ...req.body })
                return res.status(200).send({ message: "User Details Updated" })
            } else {
                return res.status(400).send({ error: "User is not exists" })
            }
        } else {
            return res.status(400).send({ error: "Provide User Id" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

export async function deleteUser(req, res) {
    try {
        const { userid } = req.headers;

        if (userid) {
            let user = await User.findById(userid)
            if (user) {
                await User.findByIdAndDelete(userid)
                return res.status(200).send({ message: " user Delete successful" })
            } else {
                return res.status(400).send({ error: "User is not exists" })
            }
        } else {
            return res.status(400).send({ error: "Provide User Id" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

