import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',  // Tham chiếu đúng tới model User
            required: true,
        },
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movies",  // Tham chiếu đúng tới model Movies
            required: true
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Comment', CommentSchema);
