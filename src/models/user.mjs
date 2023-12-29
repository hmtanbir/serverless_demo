import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

}, { timestamps: true });

const user = mongoose.model('user', userSchema, 'users');

export default user;
