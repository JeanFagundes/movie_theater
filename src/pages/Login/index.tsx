import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import BackButton from 'components/BackButton';
import { AuthContext } from 'context/AuthContext';

export default function Login() {
  const [login, setLogin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext)!;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (login.length < 9) {
      setLogin('');
      return setErrorMessage(
        'Digite um número de telefone válido contendo o prefixo da cidade'
      );
    }
    setIsLoggedIn(true);
    navigate('/');
  };

  const navigate = useNavigate();

  const handlePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  return (
    <div className={styles.container}>
      <BackButton onClick={() => navigate(-1)} />
      {errorMessage && <p className={styles.container__errorMessage}>{errorMessage}</p>}
      <h2>Login</h2>
      <p>Login to receive news</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={login}
          onChange={handlePhoneNumber}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
