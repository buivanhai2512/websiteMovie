import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    age: {
        type: Number,
    },
    avatar: {
        type: String,
        default: "https://tse1.mm.bing.net/th?id=OIP.TpqSE-tsrMBbQurUw2Su-AHaHk&pid=Api&P=0&h=180",
    },
}, { timestamps: true, versionKey: false });
UserSchema.index({ email: 1, name: 1 });

export default mongoose.model("User", UserSchema);