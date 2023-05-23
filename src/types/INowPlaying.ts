/* eslint-disable semi */

import ICredits from './ICredits';
import IDetails from './IDetails';
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
  details?: IDetails;
  videos?: IVideos[];
  credits?: ICredits[];
  genres?: IGenres[];
}
