import styles from '../styles/pages/Home.module.css';
import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface HeaderProps {
  defaultCode?: string;
}

export default function Header({defaultCode}: HeaderProps) {
  const [code, setCode] = useState<string>(defaultCode || '');

  const { push } = useRouter();

  const handleSetCode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const typedCode = e.currentTarget.value;
    setCode(typedCode.toUpperCase());

    if (typedCode.length >= 13) {
      push(`/track/${typedCode}`);
    }
  }, [push, setCode]);
  return (
    <>
      <h1 className={styles.title}>
        Rastreamento <Link href="/">Correios</Link>
      </h1>

      <p className={styles.description}>
        Para iniciar informe um código de rastreamento ex.
        <code className={styles.code}>PM987654321BR</code>
      </p>

      <p className={styles.input}>
        <input placeholder="PM987654321BR" onChange={handleSetCode} value={code}/>
      </p>
    </>
  )
}
