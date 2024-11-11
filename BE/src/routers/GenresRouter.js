import express from 'express';
import { addGenres, deleteManyGenres, getGenres, getGenresBySlug, removeGenres, updateGenres } from '../controllers/Genres';

const GenresRouter = express.Router();

GenresRouter.get(`/genres`, getGenres);
GenresRouter.post(`/genres`, addGenres);
GenresRouter.put(`/genres/:slug`, updateGenres);
GenresRouter.get(`/genres/:slug`, getGenresBySlug);
GenresRouter.delete(`/genres/:slug`, removeGenres);
GenresRouter.delete(`/genres`, deleteManyGenres);

export default GenresRouter;
