import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const episodeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
        required: true,
    },
    server_name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    embed: {
        type: String,
        required: true,
    },
    // Các trường khác nếu có
});

// Tạo slug tự động từ server_name trước khi lưu
episodeSchema.pre("save", function (next) {
    if (this.server_name) {
        this.slug = slugify(this.server_name, { lower: true, strict: true, locale: "vi" });
    }
    next();
});

// Xuất mô hình
const Episode = mongoose.model("Episode", episodeSchema);

export default Episode;
