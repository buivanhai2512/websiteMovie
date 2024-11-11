import express from 'express';
import { addCountry, deleteManyCountrys, getCountrys, getCountrysbySlug, removeCountry, updateCountry } from '../controllers/Country';

const CountryRouter = express.Router();

CountryRouter.get(`/country`, getCountrys)
CountryRouter.post(`/country`, addCountry)
CountryRouter.put(`/country/:slug`, updateCountry)
CountryRouter.get(`/country/:slug`, getCountrysbySlug)
CountryRouter.delete(`/country/:slug`, removeCountry)
CountryRouter.delete(`/countries`, deleteManyCountrys)

export default CountryRouter;