import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MoviesInTheaters.module.scss';

interface IProps {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  genres?: {
    id: number;
    name: string;
  };
  children?: ReactNode;
}

export default function MoviesInTheaters(props: IProps) {
  const navigate = useNavigate();
  function redirectAboutMovies(aboutMovie: IProps) {
    navigate(`/about/${aboutMovie.id}`);
  }

  return (
    <div className={styles.movie} key={props.id}>
      <div className={styles.nota} onClick={() => redirectAboutMovies(props)}>
        <img
          src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
          alt={props.title}
        />
        <span>{props.vote_average}</span>
      </div>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.genre}>
        {props.genres && <span key={props.genres.id}>{props.genres.name}</span>}
      </span>
    </div>
  );
}
