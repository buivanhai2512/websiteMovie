// import { Moment } from 'moment';
export interface MovieFormValues {
  id?: string;
    name: string;
    trailerCode: string;
    backdrop_path: string | null;
    poster_path: string | null;
    genres: string[];
    category: string;
    server_name?: string;
    slug?:string;
    episodes_id?: string;
      embed?: string,
    episodes: [{
      server_name: string,
      slug:string;
      embed: string,
      episodes_id: string;
    }],
    
    releaseDate: string;
    imdbPoints?: number;
    country: string | string[];
    overview: string;
  }