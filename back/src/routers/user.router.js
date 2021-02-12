import express from "express"
import { signup, signin, read } from "../controllers/user.controller.js"
import { generateMethodNotAllowed } from "../controllers/default.controller.js"
import { authorize } from "../middlewares/auth.js"

const router = express.Router()

router.route('/signup')
    .post(signup)
    .all(generateMethodNotAllowed('POST'))

router.route('/signin')
    .post(signin)
    .all(generateMethodNotAllowed('POST'))

router.route('/admin/user')
    .get(authorize, read)
    .all(generateMethodNotAllowed('GET'))

export default router