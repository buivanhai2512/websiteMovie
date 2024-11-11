import { StatusCodes } from 'http-status-codes';
import History from "../models/histories";

// Thêm lịch sử xem phim của người dùng
export const addHistortiesMovie = async (req, res) => {
    try {
        const histories = await History.findOne({
            userId: req.body.userId,
            movieId: req.body.movieId,
        });

        if (histories) {
            // Cập nhật lại thời gian tạo
            await histories.updateOne({ createdAt: new Date(0) });
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Đã xem phim lại gần đây",
            });
        } else {
            // Thêm mới lịch sử xem phim
            const historiesMovie = new History(req.body);
            await historiesMovie.save();
            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Đã xem phim gần đây thành công",
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Lấy lịch sử xem phim của người dùng
export const getUserMovieHistories = async (req, res) => {
    try {
        const movies = await History.find({ userId: req.params.id })
            .select("movieId")
            .sort({ updatedAt: -1 })
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
