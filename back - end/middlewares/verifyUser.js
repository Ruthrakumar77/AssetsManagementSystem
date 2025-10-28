import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";


export const verifyUser = async (req, res, next) => {
  try {
    // verify the cookie token
    const { token } = req.cookies
    if (token) {
      const { id } = verifyToken(token)
      if (id) {
        const user = await User.findById(id)
        if (user) {
          // setting the user data for next middleware
          req.user = user
          next()
        } else {
          return res.status(401).send({ message: "Access denined" })
        }
      } else {
        return res.status(401).send({ message: "Access denined" })
      }
    } else {
      return res.status(401).send({ message: "Access denined" })
    }
  } catch (error) {
    return res.status(500).send({ message: "server errror", error: error.message })
  }
}
