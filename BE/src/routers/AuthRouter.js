import express from 'express';
import { changePassword, deleteUser, getAllUsers, getUserById, signin, singup, updateUser, } from '../controllers/auth';
import { addHistortiesMovie, getUserMovieHistories } from '../controllers/histories';
import { addFavouritesMovie, getListFavoritesMovie, getUserMovieFavorites } from '../controllers/favorites';

const AuthRouter = express.Router();
AuthRouter.post(`/signup`, singup);
AuthRouter.post(`/signin`, signin);
AuthRouter.get("/:userId", getUserById); // Lấy thông tin người dùng theo ID
AuthRouter.get("/", getAllUsers); // Lấy tất cả người dùng
AuthRouter.put(`/:userId`, updateUser);
AuthRouter.put(`/:userId/change-password`, changePassword);
AuthRouter.delete(`/:userId`, deleteUser);
// favorites
AuthRouter.get(
    "/get-favorites-movie/:id",
    getListFavoritesMovie
);

AuthRouter.get("/user-favorites/:id", getUserMovieFavorites);

AuthRouter.post("/add-favourite", addFavouritesMovie);

AuthRouter.get("/user-history/:id", getUserMovieHistories);

AuthRouter.post("/add-history", addHistortiesMovie);
export default AuthRouter;