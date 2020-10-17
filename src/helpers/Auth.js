export function verifyToken(req, res, next) {
    const header = req.headers.authorization

    if (typeof header !== `undefined`) {
        const bearer = header.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }
}
