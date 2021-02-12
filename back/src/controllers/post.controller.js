import { Post } from "../models/post.model.js"


export const showAll = async (req, res) => {
    Post.find({})
        .populate("user")
        .then(posts => {
            res.send(posts);
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured while retrieving posts"
            });
        })
}

export const index = async (req, res) => {
    const condition = {
        user: {
            _id: req.user.id
        }
    };
    Post.find(condition)
        .populate("user")
        .then(posts => {
            res.send(posts);
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured while retrieving posts"
            });
        })
}

export const create = async (req, res) => {
    let { content, title } = req.body;
    content = content ? content.trim() : null;
    title = title ? title.trim() : null;

    if (!content || !title) {
        return res.status(400).json({
            message: "You have to send both content and title parameters"
        });
    }

    const post = new Post({
        content: content,
        title: title,
        user: req.user,
    });

    post.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured while creating post"
            })
        })
}

export const show = async (req, res) => {
    const postId = req.params.id

    Post.findById(postId)
        .populate("user")
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Not found Post with id = ${postId}`});
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Post with id = ${postId}`
            });
        });
}

export const update = async (req, res) => {
    let { content, title } = req.body;
    content = content ? content.trim() : null;
    title = title ? title.trim() : null;

    if (!content || !title) {
        return res.status(400).json({
            message: "You have to send both content and title parameters"
        });
    }

    const postId = req.params.id;
    Post.findByIdAndUpdate(postId, {content: content, title: title}, { new: true })
        .populate("user")
        .then(post => {
            if (!post) {
                res.status(404).send({
                    message: "Post not found",
               });
            }
            res.send(post)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Post with id = ${postId}`
            });
        })
    
}

export const destroy = async (req, res) => {
    const postId = req.params.id

    Post.findByIdAndRemove(postId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Post not found'
                });
            }
            res.send({
                message: 'Post successfully deleted'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occured while deleting the post"
            });
        })
}