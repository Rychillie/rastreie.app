import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello{" "}
          <a href="https://rychillie.net" target="_blank">
            World
          </a>
        </h1>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by{" "}
          <a
            href="https://rychillie.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            🦄 Rychillie
          </a>
        </p>
      </footer>
    </div>
  );
}
