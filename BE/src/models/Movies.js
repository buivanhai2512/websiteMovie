import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;

const MoviesSchema = new Schema(
    {
        // Tên phim
        name: {
            type: String,
            required: true,
        },

        // Mã trailer của phim (ví dụ: mã YouTube)
        trailerCode: {
            type: String,
            required: true,
        },

        // ID của phim, có thể là ID từ cơ sở dữ liệu bên ngoài
        id: {
            type: String,
            required: true,
        },

        // Đường dẫn ảnh nền (backdrop)
        backdrop_path: {
            type: String,
            required: true,
        },

        // Đường dẫn ảnh poster của phim
        poster_path: {
            type: String,
            required: true,
        },

        // Danh sách thể loại phim (ví dụ: ['Action', 'Comedy'])
        genres: {
            type: [String], // Sử dụng mảng các chuỗi
            required: true,
        },

        // Loại phim (ví dụ: 'Movie', 'TV Series')
        category: {
            type: String,
            required: true,
        },

        // Ngày phát hành của phim (có thể có hoặc không)
        releaseDate: {
            type: Date,
        },

        // Điểm số từ IMDb hoặc hệ thống đánh giá khác (tùy chọn)
        imdbPoints: {
            type: Number,
        },

        // Quốc gia sản xuất phim (tùy chọn)
        country: {
            type: [String],
            required: true,
        },

        // Mô tả ngắn gọn về phim
        overview: {
            type: String,
            required: true,
        },
        // Số tập phim (nếu là TV series, có thể có hoặc không)
        // episodes: [
        //     {
        //         server_name: { type: String, required: true },
        //         embed: { type: String, required: true },
        //         slug: { type: String, required: true },
        //     },
        // ],
        episodes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Episode",
                default: [],
            },
        ],
        // episodes: {
        //     type: Number,
        //     default: 0
        // },
        slug: {
            type: String,
            unique: true, // Đảm bảo slug là duy nhất
        },
        // Số lượt xem phim, mặc định là 0
        viewed: {
            type: Number,
            default: 0,
        },
    },
    {
        // Thêm tự động các trường createdAt và updatedAt
        timestamps: true,
    }
);
// Tạo slug tự động trước khi lưu tài liệu
MoviesSchema.pre("save", function (next) {
    if (this.isModified("name") || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true, locale: "vi" });
    }
    next();
});

// Tạo chỉ mục tìm kiếm theo tên phim để tối ưu hóa việc tìm kiếm
MoviesSchema.index({ name: "text" });

const Movies = mongoose.models.Movies || mongoose.model("Movies", MoviesSchema);

export default Movies;
