import Movies from "../models/Movies";
import { StatusCodes } from "http-status-codes";

// Lấy tất cả phim
export const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movies.find();
        if (allMovies.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không có phim nào!" });
        }
        res.status(StatusCodes.OK).json(allMovies);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Lấy phim theo slug
export const getMovieBySlug = async (req, res) => {
    try {
        const movie = await Movies.findOne({ slug: req.params.slug });
        if (!movie) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy phim!" });
        }
        movie.viewed += 1;
        await movie.save();
        res.status(StatusCodes.OK).json(movie);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

export const createMovie = async (req, res) => {
    try {
        // Kiểm tra xem phim đã tồn tại trong cơ sở dữ liệu hay chưa
        const existingMovies = await Movies.findOne({ name: req.body.name });
        if (existingMovies) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Tên phim đã tồn tại." });
        }

        // Tạo đối tượng phim mới và lưu vào cơ sở dữ liệu
        const newMovie = new Movies(req.body);
        await newMovie.save();

        // Trả về phản hồi thành công
        res
            .status(StatusCodes.CREATED)
            .json({ message: "Phim đã được thêm thành công!" });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Cập nhật thông tin phim
export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movies.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );
        if (!updatedMovie) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy phim!" });
        }
        res.status(StatusCodes.OK).json(updatedMovie);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Xóa phim
export const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movies.findOneAndDelete({
            slug: req.params.slug,
        });
        if (!deletedMovie) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy phim để xóa!" });
        }
        res
            .status(StatusCodes.OK)
            .json({ message: "Phim đã được xóa thành công!" });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Lấy phim theo danh mục
export const getMoviesByCategory = async (req, res) => {
    try {
        const movies = await Movies.find({ category: req.params.category });
        if (movies.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không có phim nào trong danh mục này!" });
        }
        res.status(StatusCodes.OK).json(movies);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Lấy phim theo điểm đánh giá
export const getMoviesByRating = async (req, res) => {
    try {
        const rating = req.params.rating;
        const movies = await Movies.find({ imdbPoints: { $gte: rating } });
        if (movies.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    message: "Không có phim nào có điểm đánh giá cao như yêu cầu!",
                });
        }
        res.status(StatusCodes.OK).json(movies);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};
