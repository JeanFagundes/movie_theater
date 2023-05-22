/* eslint-disable react/jsx-key */
import BackButton from 'components/BackButton';
import styles from './AboutMovie.module.scss';
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import IVideos from 'types/IVideos';
import YouTubeVideo from './VideoPlayer';

export default function AboutMovie() {
  const [activeTab, setActiveTab] = useState<SetStateAction<number>>(0);
  const [videos, setVideos] = useState<IVideos[]>([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/502356/videos',
      params: { language: 'pt-BR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setVideos(response.data.results);
        console.log('aqui esá', response.data.results[0].key);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleTabClick = (tabIndex: SetStateAction<number>) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className={styles.container}>
      <BackButton>{'Super mario world'}</BackButton>
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
      <YouTubeVideo videoKey={videos[0]?.key} />
    </div>
  );
}
