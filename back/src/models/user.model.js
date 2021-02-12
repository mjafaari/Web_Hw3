import mongoose from "mongoose"

const UserScema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserScema.method("toJSON", function () {
    const { __v, updatedAt, _id, password, ...user } = this.toObject();
    user.id = _id
    return user;
})

export const User = mongoose.model('User', UserScema)
