import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
    {
        content: String,
        title: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

PostSchema.method("toJSON", function() {
    const { __v, _id, user, ...object } = this.toObject();
    object.id = _id;
    object.user = {
        email: user.email,
        id: user._id
    }
    return object;
});

export const Post = mongoose.model('Post', PostSchema)
