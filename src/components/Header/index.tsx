import logo from 'assets/header/logo.png';
import language from 'assets/header/language.png';
import location from 'assets/header/location.png';
import styles from './Header.module.scss';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextData } from 'context/AuthContext';

export default function Header() {
  const locations = ['Brasil', 'Inglaterra', 'Canada', 'Alemanha'];
  const languages = ['Português', 'Ingles', 'Alemão', 'Espanhol'];
  const [selectedOption, setSelectedOption] = useState<string>(locations[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)!;

  const navigate = useNavigate();
  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    changeOption: string
  ) {
    if (changeOption === 'location') {
      setSelectedOption(event.target.value);
    } else {
      setSelectedLanguage(event.target.value);
    }
  }

  function redirectLogin() {
    navigate('/login');
  }

  const logout = (): void => {
    // Lógica de logout
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.header}>
      <ul className={styles.header__list}>
        <li className={styles.header__itens}>
          <img className={styles.header__logo} src={logo} alt="logo" />
        </li>
        <img className={styles.header__icon} src={location} alt="location" />
        <li className={styles.header__itens}>
          <select
            value={selectedOption}
            onChange={(event) => handleChange(event, 'location')}>
            {locations.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </li>
        <img className={styles.header__icon} src={language} alt="language" />
        <li className={styles.header__itens}>
          <select
            value={selectedLanguage}
            onChange={(event) => handleChange(event, 'language')}>
            {languages.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.header__itens}>
          {!isLoggedIn ? (
            <button onClick={() => redirectLogin()} className={styles.header__button}>
              Login
            </button>
          ) : (
            <button className={styles.header__button} onClick={logout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
