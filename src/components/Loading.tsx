import styles from '../styles/components/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}/>
      <div className={styles.circle}/>
      <div className={styles.circle}/>
      <div className={styles.shadow}/>
      <div className={styles.shadow}/>
      <div className={styles.shadow}/>
      <span>Loading</span>
    </div>
  )
}
