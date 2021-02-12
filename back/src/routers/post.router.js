
import express from "express"
import { authorize, postPrivilege } from "../middlewares/auth.js"
import { showAll, index, create, show, update, destroy } from "../controllers/post.controller.js"
import { generateMethodNotAllowed } from "../controllers/default.controller.js"

const router = express.Router()

router.route('/post').get(showAll)

router.route('/admin/post')
    .get(authorize, index)
    .post(authorize, create)

router.route('/admin/post/:id')
    .get(authorize, show)
    .put(authorize, postPrivilege, update)
    .delete(authorize, postPrivilege, destroy)

export default router