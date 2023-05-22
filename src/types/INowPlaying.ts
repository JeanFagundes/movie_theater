/* eslint-disable semi */

import IGenres from './IGenres';
import IVideos from './IVideos';

//interface dos filmes que estão em cartaz no cinema
export default interface INowPlaying {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres?: IGenres[];
  videos?: IVideos[];
}
