import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const CountrySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
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
    { timestamps: true, versionKey: false }
);

// Tạo slug tự động trước khi lưu tài liệu
CountrySchema.pre("save", function (next) {
    if (this.isModified("name") || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true, locale: "vi" });
    }
    next();
});

export default mongoose.model("Country", CountrySchema);
