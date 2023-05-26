import styles from './Home.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import RequisicaoContext from 'context/RequisicaoAxios';
import { ChangeEvent, useContext, useState } from 'react';
import MoviesInTheaters from 'components/moviesInTheaters';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const moviesHook = useContext(RequisicaoContext);

  const handleSearchIconClick = () => {
    setSearchOpen(!searchOpen);
  };
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredMovies = moviesHook.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className={styles.section}>
      <div className={styles.section__title}>
        <h2 className={styles.section__titleText}>Now in theaters</h2>
        <AiOutlineSearch
          onClick={handleSearchIconClick}
          className={styles.section__icon}
          size={24}
        />
      </div>

      {searchOpen && (
        <div className={styles.section__iconSearch}>
          <input
            type="text"
            placeholder="Digite o nome do filme"
            onChange={handleSearchInputChange}
            value={searchValue}
          />
        </div>
      )}
      <div className={styles.section__movies}>
        {searchOpen && searchValue
          ? filteredMovies.map((movie) => (
              <MoviesInTheaters
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                title={movie.title}
                genres={movie.genres?.[0]}
              />
            ))
          : moviesHook.map((movie) => (
              <MoviesInTheaters
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                title={movie.title}
                genres={movie.genres?.[0]}
              />
            ))}
      </div>
    </section>
  );
}
