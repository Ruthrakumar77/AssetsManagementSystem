import bcrypt from "bcrypt"

const saltRound = 10

export function createHash(plainPassword) {
    return bcrypt.hashSync(plainPassword, saltRound)
}

export async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


