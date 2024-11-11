import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const GenresSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
        },
        slug: {
            type: String,
            unique: true, // Đảm bảo slug là duy nhất
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Tạo slug tự động trước khi lưu tài liệu
GenresSchema.pre("save", function (next) {
    if (this.isModified("name") || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true, locale: "vi" });
    }
    next();
});

// Kiểm tra mô hình trước khi khởi tạo để tránh lỗi OverwriteModelError
export default mongoose.models.genres || mongoose.model("genres", GenresSchema);
