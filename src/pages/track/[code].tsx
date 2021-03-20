import axios from "axios";
import styles from "../../styles/pages/Home.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import createPersistedState from "use-persisted-state";
import Head from "next/head";

interface TrackingProps {
  tracking: ITracking;
}
const useHistoryState = createPersistedState("Tracker@history");

export default function Track({ tracking }: TrackingProps) {
  const [history, setHistory] = useHistoryState<string[]>([]);

  useEffect(() => {
    if (!tracking.isInvalid && !history.find((h) => h === tracking.code)) {
      setHistory([tracking.code, ...history]);
    }
  }, [tracking]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Head>
          <title>Rastreamento {tracking.code}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header defaultCode={tracking.code} />
        {tracking && !tracking.isInvalid ? (
          <div className={styles.grid}>
            {tracking.tracks.map((track, index) => (
              <a key={index} href="#docs" className={styles.card}>
                <h3>
                  {track.locale}
                  <small>{track.formattedTrackedAt}</small>
                </h3>
                {track.path && (
                  <div>
                    <span>{track.path.from}</span>
                    <span>{track.path.to}</span>
                  </div>
                )}
                <p>{track.status}</p>
              </a>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {tracking && tracking.isInvalid ? (
              <Error>
                <div>{tracking.error}</div>
              </Error>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { code } = params;

  if (code.length < 13) {
    return { props: {} };
  }

  const { data } = await axios.get<ITracking>(
    `http://rastreie-app.vercel.app/api/${code}`
  );

  return {
    props: { tracking: data },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};
