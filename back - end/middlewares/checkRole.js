export function checkRole(roles) {
    return (req, res, next) => {
        try {
            const { user } = req
            const isAuthorized = roles.includes(user.role)
            if (isAuthorized) {
                next()
            } else {
                return res.status(401).send({ message: "Access Denied role" })
            }
        } catch (error) {
            return res.status(500).send({ message: "Server Error", error: error.message })
        }
    }
}