import styles from './PageLoading.module.css';

export const PageLoading = () => {
  return (
    <div className={styles.container}>
      <h1>Loading...</h1>
    </div>
  );
};

PageLoading.displayName = 'PageLoading';
