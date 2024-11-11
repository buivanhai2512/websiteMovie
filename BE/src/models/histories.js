import mongoose, { Schema } from "mongoose";

const History = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movies",
            required: true
        },
    },
    {
        timestamps: true,
    }
);

// Thêm chỉ mục để tối ưu hóa truy vấn
History.index({ userId: 1, movieId: 1 });

export default mongoose.model("histories", History);
