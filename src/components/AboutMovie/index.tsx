/* eslint-disable react/jsx-key */
import BackButton from 'components/BackButton';
import styles from './AboutMovie.module.scss';
import { SetStateAction, useContext, useState } from 'react';
import YouTubeVideo from './VideoPlayer';
import { useParams, useNavigate } from 'react-router-dom';
import RequisicaoContext from 'context/RequisicaoAxios';
import WatchProvider from './WatchProvider';

export default function AboutMovie() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const moviesHook = useContext(RequisicaoContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = moviesHook.find((movie) => movie.id === Number(id));
  const handleTabClick = (tabIndex: SetStateAction<number>) => {
    setActiveTab(tabIndex);
  };
  return (
    <div className={styles.container}>
      <BackButton onClick={() => navigate(-1)}>{movie?.title}</BackButton>
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
          Watch
        </li>
      </ul>

      {activeTab === 0 ? (
        <>
          {typeof movie?.videos?.[0].key === 'string' && movie?.videos?.[0].key !== '' ? (
            <YouTubeVideo videoKey={movie?.videos?.[0]?.key} />
          ) : (
            <div>Trailer não divulgado</div>
          )}

          <div className={styles.container__sectionNota}>
            <ul className={styles.container__notaList}>
              <li className={styles.container__list}>{movie?.vote_average}</li>
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
                        .filter((credit) => credit.known_for_department === 'Directing')
                        .map((credit) => (
                          <span key={credit.id}>{`${credit.name}, `}</span>
                        ))}
                  </li>
                </ul>
                <ul>
                  <li className={styles.container__sectionLabel}>Cast</li>
                  <li className={styles.container__sectionItem}>
                    {movie.credits &&
                      movie.credits
                        .filter((credit) => credit.known_for_department === 'Acting')
                        .slice(0, 10)
                        .map((credit) => (
                          <span key={credit.id}>{`${credit.name}, `}</span>
                        ))}
                  </li>
                </ul>
              </div>
            ))}
        </>
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <WatchProvider key={movie?.id} movies={movie!} />
      )}
    </div>
  );
}
