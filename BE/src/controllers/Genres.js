import { StatusCodes } from "http-status-codes";
import Movies from "../models/Movies";
import Genre from "../models/Genres";

// Lấy tất cả loại phim
export const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        if (genres.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có loại phim nào!" });
        }
        res.status(StatusCodes.OK).json(genres);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

// Lấy loại phim theo slug
export const getGenresBySlug = async (req, res) => {
    try {
        const genre = await Genre.findOne({ slug: req.params.slug }); // Sử dụng slug để tìm loại phim
        if (!genre) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy loại phim!" });
        }
        res.status(StatusCodes.OK).json(genre);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

// Thêm loại phim mới
export const addGenres = async (req, res) => {
    try {
        // Kiểm tra nếu loại phim đã tồn tại dựa trên tên
        const existingGenre = await Genre.findOne({ name: req.body.name });

        if (existingGenre) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Loại phim đã tồn tại." });
        }
        // Nếu loại phim chưa tồn tại, tiến hành thêm mới
        const newGenre = new Genre(req.body);
        await newGenre.save();

        res.status(StatusCodes.CREATED).json(newGenre);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Cập nhật loại phim dựa trên slug
export const updateGenres = async (req, res) => {
    try {
        const updatedGenre = await Genre.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }); // Sử dụng slug
        if (!updatedGenre) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy loại phim!" });
        }
        res.status(StatusCodes.OK).json(updatedGenre);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Xóa loại phim dựa trên slug
export const removeGenres = async (req, res) => {
    try {
        const genreSlug = req.params.slug; // Sử dụng slug
        // Kiểm tra loại phim có tồn tại không
        const genreToDelete = await Genre.findOne({ slug: genreSlug });
        if (!genreToDelete) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy loại phim nào để xóa." });
        }
        // Không cho phép xóa loại phim mặc định
        if (genreToDelete.isDefault) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Không thể xóa loại phim mặc định." });
        }
        // Kiểm tra xem có phim nào liên kết với loại phim này không
        const relatedMovies = await Movies.find({ genre: genreToDelete._id });
        // Nếu có phim liên kết, cần tạo loại phim "Không xác định" (nếu chưa tồn tại)
        let defaultGenre = await Genre.findOne({ name: 'Không xác định' });
        if (relatedMovies.length > 0 && !defaultGenre) {
            // Tạo loại phim "Không xác định" nếu chưa tồn tại
            defaultGenre = new Genre({
                name: 'Không xác định',
                isDefault: true
            });
            await defaultGenre.save();
        }
        // Nếu có phim liên kết, cập nhật tất cả các phim sang loại phim "Không xác định"
        if (relatedMovies.length > 0) {
            await Movies.updateMany({ genre: genreToDelete._id }, { genre: defaultGenre._id });
        }
        // Xóa loại phim
        await Genre.findByIdAndDelete(genreToDelete._id);
        res.status(StatusCodes.OK).json({
            message: relatedMovies.length > 0
                ? `Loại phim đã bị xóa và ${relatedMovies.length} phim đã được cập nhật sang loại phim "Không xác định".`
                : "Loại phim đã bị xóa thành công."
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Xóa nhiều loại phim dựa trên slug
export const deleteManyGenres = async (req, res) => {
    try {
        const { slugs } = req.body;
        // Kiểm tra xem danh sách slugs có tồn tại và không trống
        if (!slugs || slugs.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Không có slug nào được cung cấp." });
        }
        // loại phim mặc định
        const defaultGenreId = 'default_genre_id';

        // Tìm tất cả các phim liên quan đến các loại phim cần xóa
        const relatedMovies = await Movies.find({ genre: { $in: slugs } });

        // Cập nhật các phim liên quan đến loại phim bị xóa sang loại phim mặc định
        if (relatedMovies.length > 0) {
            await Movies.updateMany({ genre: { $in: slugs } }, { genre: defaultGenreId });
        }
        // Xóa các loại phim trong danh sách slugs
        const result = await Genre.deleteMany({ slug: { $in: slugs } });
        // Kiểm tra số lượng loại phim đã xóa
        if (result.deletedCount === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy loại phim nào để xóa." });
        }

        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
