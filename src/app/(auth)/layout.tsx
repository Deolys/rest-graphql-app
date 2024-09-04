import type { ReactNode } from 'react';

import styles from './auth.module.css';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <div className={styles.backgroundImage}>
      <div className={styles.formWrapper}>{children}</div>
    </div>
  );
}
