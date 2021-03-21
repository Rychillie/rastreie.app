import Head from "next/head";
import createPersistedState from "use-persisted-state";
import styles from "../styles/pages/Home.module.css";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const useHistoryState = createPersistedState("Tracker@history");

export default function Home() {
  const [history, setHistory] = useHistoryState<string[]>([]);

  return (
    <>
      <Head>
        <title>Rastreamento Correios</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.grid}>
            {history.length > 0 && (
              <div className={styles.history}>
                <h3>Histórico</h3>
                <ul>
                  {history.map((h) => (
                    <li key={h}>
                      <Link href={`/track/${h}`}>{h}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
