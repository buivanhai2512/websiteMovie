import mongoose, { Schema } from 'mongoose';


const FavoriteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",  // Tham chiếu đúng tới model User
            required: true
        },
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movies",  // Tham chiếu đúng tới model Movies
            required: true
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Favorites", FavoriteSchema);
