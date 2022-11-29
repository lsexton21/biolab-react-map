import styles from "./LoadingSpinnerNew.module.css";

const LoadingSpinnerNew = () => {
  return (
    <div className={styles.loadingContainer}>
      Loading
      <div className={styles.container}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default LoadingSpinnerNew;
