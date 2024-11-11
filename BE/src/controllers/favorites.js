import { StatusCodes } from 'http-status-codes';
import Favorite from "../models/favorites";

// Lấy danh sách các bộ phim yêu thích của người dùng
export const getListFavoritesMovie = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.params.id });
        const listFavoriteMovie = favorites.map((favorite) => favorite.movieId);

        return res.status(StatusCodes.OK).json({
            success: true,
            data: listFavoriteMovie,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Thêm hoặc bỏ yêu thích bộ phim
export const addFavouritesMovie = async (req, res) => {
    try {
        const favorites = await Favorite.findOne({
            userId: req.body.userId,
            movieId: req.body.movieId,
        });

        if (favorites) {
            // Nếu đã yêu thích, bỏ yêu thích
            await favorites.deleteOne();
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Đã bỏ yêu thích phim",
            });
        } else {
            // Nếu chưa yêu thích, thêm vào danh sách yêu thích
            const favoritesMovie = new Favorite(req.body);
            await favoritesMovie.save();
            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Đã thêm phim yêu thích thành công",
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Lấy danh sách phim yêu thích của người dùng
export const getUserMovieFavorites = async (req, res) => {
    try {
        const movies = await Favorite.find({ userId: req.params.id })
            .select("movieId")
            .sort({ createdAt: -1 })
            .populate("movieId");

        return res.status(StatusCodes.OK).json({
            success: true,
            data: movies,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};
