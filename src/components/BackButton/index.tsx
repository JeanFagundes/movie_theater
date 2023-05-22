import styles from './BackButton.module.scss';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

interface IProps {
  children?: React.ReactNode;
}
export default function BackButton({ children }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <MdOutlineArrowBackIosNew className={styles.container__icon} size={20} />
        {<span className={styles.container__text}> {children}</span>}
      </div>
    </div>
  );
}
