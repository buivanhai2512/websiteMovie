import express from 'express';
import { addEpisode, deleteEpisode, getEpisodes, getEpisodesById, updateEpisode } from '../controllers/Episode';

const EpisodesRouter = express.Router();

EpisodesRouter.post('/episodes', addEpisode);
EpisodesRouter.put('/episodesById/:slug', updateEpisode);
EpisodesRouter.delete('/episodesById/:episodeId', deleteEpisode);
EpisodesRouter.get('/episodes/:movieSlug', getEpisodes);
// EpisodesRouter.get('/episodesById/:episodeId', getEpisodesById);
EpisodesRouter.get('/episodesById/:slug', getEpisodesById);

export default EpisodesRouter;
