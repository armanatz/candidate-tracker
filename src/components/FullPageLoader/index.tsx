import styles from './style.module.scss';

export default function FullPageLoader() {
  return (
    <div className={styles.container}>
      <p>Loading...</p>
    </div>
  );
}
