import RequisicaoContext from 'context/RequisicaoAxios';
import { useContext } from 'react';
import styles from './WatchProvider.module.scss';
import { useParams } from 'react-router-dom';
import INowPlaying from 'types/INowPlaying';

interface IWatchProviderProps {
  movies: INowPlaying;
}

export default function WatchProvider({ movies }: IWatchProviderProps) {
  console.log('tentando', movies);

  const { id } = useParams<{ id: string }>();
  //const movie = moviesHook.find((movie) => movie.id === Number(id));

  return (
    <div className={styles.container}>
      <img
        className={styles.container__logo}
        src={`https://image.tmdb.org/t/p/w500${movies?.backdrop_path}`}
        alt={movies?.title}
      />
      <h2>Rent</h2>
      <ul>
        {movies?.watch_provider?.rent?.map((provider) => (
          <li key={provider.provider_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${provider?.logo_path}`}
              alt={provider?.provider_name}
            />
            <span>24,99R$</span>
          </li>
        ))}
      </ul>
      <h2>Buy</h2>
      <ul>
        {movies?.watch_provider?.buy?.map((provider) => (
          <li key={provider.provider_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${provider?.logo_path}`}
              alt={provider?.provider_name}
            />
            <span>39,99R$</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
