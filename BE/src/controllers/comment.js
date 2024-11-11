import { StatusCodes } from 'http-status-codes';
import Comment from "../models/comments";

// Lấy danh sách bình luận của phim theo ID phim
export const getCommentByid = async (req, res) => {
    try {
        const comment = await Comment.find({ movieId: req.params.id })
            .populate({
                path: "userId",
                select: ["name", "email", "avatar"],
            })
            .sort({ createdAt: -1 });
        return res.status(StatusCodes.OK).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Lấy số lượng bình luận của phim theo ID phim
export const getCountComments = async (req, res) => {
    try {
        const counts = await Comment.countDocuments({ movieId: req.params.id });
        return res.status(StatusCodes.OK).json({
            success: true,
            counts: counts,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Đăng một bình luận mới
export const postComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Bình luận thành công",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Cập nhật bình luận
export const updateComment = async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Cập nhật thành công",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Xoá bình luận
export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Đã xoá thành công",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Lấy tổng số bình luận trong tháng hiện tại
export const TotalCommentByMonth = async (req, res) => {
    const date = new Date();
    const firstDateOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDateOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    try {
        const comment = await Comment.countDocuments({
            createdAt: { $gte: firstDateOfCurrentMonth, $lt: endDateOfCurrentMonth },
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

// Lấy bình luận trong tháng hiện tại
export const commentByMonth = async (req, res) => {
    const date = new Date();
    const firstDateOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDateOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    try {
        const comment = await Comment.find({
            createdAt: { $gte: firstDateOfCurrentMonth, $lt: endDateOfCurrentMonth },
        })
            .populate({
                path: "userId",
                select: ["name", "email", "avatar"],
            })
            .sort({ createdAt: -1 });

        return res.status(StatusCodes.OK).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};
