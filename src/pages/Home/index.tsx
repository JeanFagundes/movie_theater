import INowPlaying from 'types/INowPlaying';
import styles from './Home.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import IGenres from 'types/IGenres';
import axios from 'axios';

export default function Home() {
  const [moviesPlaying, setMoviesPlaying] = useState<INowPlaying[]>([]);

  const urlMoviesPlaying = 'https://api.themoviedb.org/3/movie/now_playing';
  useEffect(() => {
    const options = {
      method: 'GET',
      url: urlMoviesPlaying,
      params: { language: 'pt_BR', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMoviesPlaying(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      const genreRequests = moviesPlaying.map(async (movie) => {
        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${movie.id}`,
          params: { language: 'en-US', video: true },
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
          },
        };

        try {
          const response = await axios.request(options);
          const genres: IGenres[] = response.data.genres;

          setMoviesPlaying((oldList: INowPlaying[]) => {
            const updatedList: INowPlaying[] = [...oldList];
            const movieIndex = updatedList.findIndex((item) => item.id === movie.id);

            if (movieIndex !== -1) {
              updatedList[movieIndex] = {
                ...updatedList[movieIndex],
                genres: genres,
              };
            }

            return updatedList;
          });
        } catch (error) {
          console.error('erro na solicitação', error);
        }
      });

      await Promise.all(genreRequests);
    };

    if (moviesPlaying.length > 0) {
      fetchGenres();
    }
  }, [moviesPlaying]);

  return (
    <section className={styles.section}>
      <div className={styles.section__title}>
        <h2 className={styles.section__titleText}>Now in cinemas</h2>
        <AiOutlineSearch className={styles.section__icon} size={24} />
      </div>

      <div className={styles.section__movies}>
        {moviesPlaying.map((movie) => (
          <div className={styles.movie} key={movie.id}>
            <div className={styles.nota}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className={styles.section__title}>{movie.title}</span>
            <span className={styles.section__genre}>
              {movie.genres && <span key={movie.id}>{movie.genres?.[0].name}</span>}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
