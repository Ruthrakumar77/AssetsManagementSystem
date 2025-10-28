import jwt from "jsonwebtoken"

let secretKey = "776699"

export const generateToken = (payload, optional = {}) => {
    return jwt.sign(payload, secretKey, optional)
}


export const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}