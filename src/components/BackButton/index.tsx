import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

interface IProps {
  children?: React.ReactNode;
  onClick: () => void | undefined;
}

export default function BackButton({ children }: IProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <MdOutlineArrowBackIosNew
          onClick={() => navigate(-1)}
          className={styles.container__icon}
          size={20}
        />
        {<span className={styles.container__text}> {children}</span>}
      </div>
    </div>
  );
}
