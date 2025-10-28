import User from "../models/User.js"
import { comparePassword } from "../utils/bcrypt.js"
import { generateToken } from "../utils/jwt.js"


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await User.findOne({ email })
            if (user) {
                const isMatched = await comparePassword(password, user.password)
                if (isMatched) {
                    const token = generateToken({ id: user._id })
                    res.cookie("token", token) // client browser
                    res.status(200).send({ message: "Login successfully" })
                } else {
                    return res.status(400).send({ message: "password not matched" })
                }
            } else {
                return res.status(401).send({ message: "user not exists" })
            }
        } else {
            return res.status(400).send({ message: "Provide the required fields" })
        }

    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: error.message })
    }
}


export const authStatus = async (req, res) => {
    try {
        const { user } = req
        return res.status(200).send({
            role: user.role,
            name: user.name,
            email: user.email,
            department: user.department,
            status: user.status,
            mobile: user.mobile,
            designation: user.designation

        })
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        })
    }
}

export const userLogout = async (req, res) => {
    try {
        // clear the cookie
        const { token } = req.cookies
        if (token) {
            res.clearCookie("token")
            res.status(200).send({ message: "Logout successful" })
        } else {
            return res.status(400).send({ error: "User is not logged in" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}