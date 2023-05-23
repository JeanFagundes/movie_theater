import styles from './Home.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import useNowPlayingMovies from 'components/RequisicaoAxios';
import INowPlaying from 'types/INowPlaying';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const moviesHook = useNowPlayingMovies();

  const navigate = useNavigate();

  function redirectAboutMovies(aboutMovie: INowPlaying) {
    navigate(`/about/${aboutMovie.id}`);
  }

  return (
    <section className={styles.section}>
      <div className={styles.section__title}>
        <h2 className={styles.section__titleText}>Now in cinemas</h2>
        <AiOutlineSearch className={styles.section__icon} size={24} />
      </div>

      <div className={styles.section__movies}>
        {moviesHook.map((movie) => (
          <div className={styles.movie} key={movie.id}>
            <div className={styles.nota} onClick={() => redirectAboutMovies(movie)}>
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
