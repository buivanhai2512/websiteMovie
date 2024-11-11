import express from 'express';
import { createMovie, deleteMovie, getAllMovies, getMovieBySlug, getMoviesByCategory, getMoviesByRating, updateMovie } from '../controllers/Movies';
import { checkrole } from '../controllers/auth';

const MoviesRouter = express.Router();

// Route để lấy tất cả các phim
MoviesRouter.get('/movies', getAllMovies);

// Route để lấy thông tin chi tiết phim theo slug
MoviesRouter.get('/movies/:slug', getMovieBySlug);

// Route để lấy phim theo danh mục
MoviesRouter.get('/movies/category/:category', getMoviesByCategory);

// Route để lấy phim theo điểm đánh giá
MoviesRouter.get('/movies/rating/:rating', getMoviesByRating);
// Route để thêm phim mới
MoviesRouter.post('/movies', checkrole, createMovie);

// Route để cập nhật thông tin phim theo slug
MoviesRouter.put('/movies/:slug', checkrole, updateMovie);

// Route để xóa phim theo slug
MoviesRouter.delete('/movies/:slug', checkrole, deleteMovie);


export default MoviesRouter;
