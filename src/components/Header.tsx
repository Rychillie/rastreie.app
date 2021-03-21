import styles from "../styles/pages/Home.module.css";
import { ChangeEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  defaultCode?: string;
}

export default function Header({ defaultCode }: HeaderProps) {
  const [code, setCode] = useState<string>(defaultCode || "");

  const { push } = useRouter();

  const handleSetCode = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const typedCode = e.currentTarget.value;
      setCode(typedCode.toUpperCase());

      if (typedCode.length >= 13) {
        push(`/track/${typedCode}`);
      }
    },
    [push, setCode]
  );
  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <Image
          src="/assets/bike_undraw.png"
          alt="Picture of the author"
          layout="fixed"
          width={280}
          height={124}
        />
      </div>

      <div className={styles.containerBanner}>
        <h1 className={styles.title}>Rastreie sua encomenda</h1>

        <p className={styles.description}>
          Insira seu código da sua encomenda e acompanhe seu pacote.
        </p>

        <input
          className={styles.input}
          placeholder="PM987654321BR"
          onChange={handleSetCode}
          value={code}
        />
      </div>
    </header>
  );
}
