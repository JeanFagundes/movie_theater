/* eslint-disable semi */

import ICredits from './ICredits';
import IDetails from './IDetails';
import IGenres from './IGenres';
import IVideos from './IVideos';
import IWatchProviders from './IWatchProviders';

//interface dos filmes que estão em cartaz no cinema
export default interface INowPlaying {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  details?: IDetails;
  backdrop_path: string;
  videos?: IVideos[];
  credits?: ICredits[];
  genres?: IGenres[];
  watch_provider?: IWatchProviders;
}
