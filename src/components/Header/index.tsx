import logo from 'assets/header/logo.png';
import language from 'assets/header/language.png';
import location from 'assets/header/location.png';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <nav className={styles.header}>
      <ul className={styles.header__list}>
        <li className={styles.header__itens}>
          {' '}
          <img style={{ width: '14vw' }} src={logo} alt="logo" />{' '}
        </li>
        <img
          style={{ width: '6vw' }}
          className={styles.header__icon}
          src={location}
          alt="location"
        />
        <li className={styles.header__itens}>Localização</li>
        <img
          style={{ width: '6vw' }}
          className={styles.header__icon}
          src={language}
          alt="language"
        />
        <li className={styles.header__itens}>Eng</li>
        <li className={styles.header__itens}>
          <button className={styles.header__button}>Log in</button>
        </li>
      </ul>
    </nav>
  );
}
