import { fullUrl } from "../utils.js"

export const notFound = (req, res) => {
    res.status(404).json({
        message: `${fullUrl(req)} not found!`
    })
}

export const generateMethodNotAllowed = (allowedMethod) => {
    return (_, res) => {
        res.status(405).json({
            message: `Only \`${allowedMethod}\` Method is Valid.`
        })
    }
}