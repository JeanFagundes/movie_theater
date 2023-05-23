/* eslint-disable react/jsx-key */
import BackButton from 'components/BackButton';
import styles from './AboutMovie.module.scss';
import { SetStateAction, useState } from 'react';
import YouTubeVideo from './VideoPlayer';
import RequisicaoAxios from 'components/RequisicaoAxios';
import { useParams } from 'react-router-dom';
import INowPlaying from 'types/INowPlaying';

export default function AboutMovie() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const moviesHook = RequisicaoAxios();

  const { id } = useParams<{ id: string }>();
  const nowPlaying: INowPlaying[] = moviesHook;
  const handleTabClick = (tabIndex: SetStateAction<number>) => {
    setActiveTab(tabIndex);
  };

  const findVideos = () => {
    const movieVideo = nowPlaying.find((movie) => movie.id === Number(id));
    if (!movieVideo) {
      return null;
    }
    const videos = movieVideo.videos || [];
    return videos[0]?.key;
  };

  const findTitle = () => {
    const movieTitle = nowPlaying.find((movie) => movie.id === Number(id));
    if (!movieTitle) {
      return null;
    }
    return movieTitle.title;
  };
  const movieDetails = nowPlaying.find((movie) => movie.id === Number(id));
  if (!movieDetails) {
    return <div></div>;
  }

  const findRuntime = () => {
    const movieRuntime = nowPlaying.find((movie) => movie.id === Number(id));
    if (!movieRuntime) {
      console.log('entrou aqui ');
      return null;
    }
    const runtime = movieRuntime.details || [];
    return runtime;
  };

  moviesHook
    .filter((movie) => movie.id === Number(id))
    .map((movie) => console.log(movie.credits));

  const runtime = findRuntime();
  const videoKey = findVideos();

  return (
    <div className={styles.container}>
      <BackButton>{findTitle()}</BackButton>
      <ul className={styles.container__tabs}>
        <li
          className={`${styles.container__tab} ${
            activeTab === 0 ? `${styles.container__tab__active}` : ''
          }`}
          onClick={() => handleTabClick(0)}>
          About
        </li>
        <li
          className={`${styles.container__tab} ${
            activeTab === 1 ? `${styles.container__tab__active}` : ''
          }`}
          onClick={() => handleTabClick(1)}>
          Sessions
        </li>
      </ul>
      {typeof videoKey === 'string' && videoKey !== '' ? (
        <YouTubeVideo videoKey={videoKey} />
      ) : (
        <div>Trailer não divulgado</div>
      )}

      <div className={styles.container__sectionNota}>
        <ul className={styles.container__notaList}>
          <li className={styles.container__list}>{movieDetails.vote_average}</li>
          <li className={styles.container__listName}>IMDB</li>
        </ul>
        <ul className={styles.container__notaList}>
          <li className={styles.container__list}>7.9</li>
          <li className={styles.container__listName}>Popular</li>
        </ul>
      </div>

      {moviesHook
        .filter((movie) => movie.id === Number(id))
        .map((movie) => (
          <div className={styles.container__section} key={movie.id}>
            <p>{movie.overview}</p>
            <ul>
              <li className={styles.container__sectionLabel}>Runtime</li>
              <li className={styles.container__sectionItem}>
                {movie.details && movie.details?.runtime}
              </li>
            </ul>

            <ul>
              <li className={styles.container__sectionLabel}>Release</li>
              <li className={styles.container__sectionItem}>
                <span>{movie.release_date}</span>
              </li>
            </ul>
            <ul>
              <li className={styles.container__sectionLabel}>Genre</li>
              <li className={styles.container__sectionItem}>
                {movie.genres?.map((genres) => (
                  <span key={genres.id}>{`${genres.name}, `}</span>
                ))}
              </li>
            </ul>
            <ul>
              <li className={styles.container__sectionLabel}>Director</li>
              <li className={styles.container__sectionItem}>
                {movie.credits &&
                  movie.credits
                    .filter((credit) => credit.known_for_department === 'Director')
                    .map((credit) => <span key={credit.id}>{credit.name}</span>)}
              </li>
            </ul>
            <ul>
              <li className={styles.container__sectionLabel}>Cast</li>
              <li className={styles.container__sectionItem}>
                {movie.credits &&
                  movie.credits
                    .filter((credit) => credit.known_for_department === 'Acting')
                    .slice(0, 10)
                    .map((credit) => <span key={credit.id}>{`${credit.name}, `}</span>)}
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
