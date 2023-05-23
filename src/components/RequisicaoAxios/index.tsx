import { useState, useEffect } from 'react';
import axios from 'axios';
import ICredits from 'types/ICredits';
import IDetails from 'types/IDetails';
import IVideos from 'types/IVideos';
import INowPlaying from 'types/INowPlaying';
import IGenres from 'types/IGenres';

export default function RequisicaoAxios() {
  const [moviesPlaying, setMoviesPlaying] = useState<INowPlaying[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: { language: 'pt_BR', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
        },
      };

      try {
        const response = await axios.request(options);
        const nowPlayingData: INowPlaying[] = response.data.results;
        const updatedMoviesPlaying: INowPlaying[] = [];

        const fetchMovieDetails = async (movie: INowPlaying) => {
          const detailsOptions = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie.id}`,
            params: { language: 'en-US' },
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
            },
          };

          const videosOptions = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
            params: { language: 'en-US' },
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
            },
          };

          const creditsOptions = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
            params: { language: 'en-US' },
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
            },
          };

          const genresOptions = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie.id}`,
            params: { language: 'en-US' },
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
            },
          };

          const [detailsResponse, videosResponse, creditsResponse, genresResponse] =
            await Promise.all([
              axios.request(detailsOptions),
              axios.request(videosOptions),
              axios.request(creditsOptions),
              axios.request(genresOptions),
            ]);

          const genres: IGenres[] = genresResponse.data.genres;
          const { runtime, id }: IDetails = detailsResponse.data;
          const videos: IVideos[] = videosResponse.data.results;
          const credits: ICredits[] = creditsResponse.data.cast;

          const updatedMovie: INowPlaying = {
            ...movie,
            details: {
              id,
              runtime,
            },
            genres,
            videos,
            credits,
          };

          updatedMoviesPlaying.push(updatedMovie);
        };

        const fetchMovieDetailsRequests = nowPlayingData.map(fetchMovieDetails);
        await Promise.all(fetchMovieDetailsRequests);

        setMoviesPlaying(updatedMoviesPlaying);
      } catch (error) {
        console.error('Erro na solicitação de filmes em cartaz', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 86400000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return moviesPlaying;
}
