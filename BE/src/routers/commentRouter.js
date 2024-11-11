import express from "express";
import {
    commentByMonth,
    deleteComment,
    getCommentByid,
    getCountComments,
    postComment,
    TotalCommentByMonth,
    updateComment,
} from "../controllers/comment";

const CommentRouter = express.Router();

CommentRouter.get(`/get-comment/:id`, getCommentByid);
CommentRouter.get(`/get-count-comment/:id`, getCountComments);
CommentRouter.get(`/get-count-comment-month`, TotalCommentByMonth);
CommentRouter.get(`/get-comment-month`, commentByMonth);
CommentRouter.post(`/post-comment`, postComment);
CommentRouter.put(`/update-comment/:id`, updateComment);
CommentRouter.delete(`/delete-comment/:id`, deleteComment);

export default CommentRouter;
