import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const signup = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) return res.status(400).json({
            message: "request length should be 2."
        })

    let users = await User.find({ email: email })

    if (users.length) return res.status(409).json({
            message: "email already exists."
        })
    
    if (!emailReg.test(email)) return res.status(400).json({
            message: "field `email` is not valid."
        })
    
    if (password.length < 5) return res.status(400).json({
            message: "field `password` length should be gt 5."
        })

    const user = new User({
        email: email,
        password: password,
    })
    await user.save()

    res.status(201).json({
        message: "user has been created."
    })
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({
        message: "request length should be 2."
    })

    if (!emailReg.test(email)) return res.status(400).json({
        message: "field `email` is not valid."
    })

    let users = await User.find({
        email: email,
        password: password
    })

    if (!users.length) {
        return res.status(401).json({
            message: "wrong email or password"
        })
    }

    const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h"
    })

    res.status(200).json({
        token: `Bearer ${accessToken}`
    })
}

export const read = (req, res) => res.json(req.user)
