import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
});

export default mongoose.model("Category", categorySchema);