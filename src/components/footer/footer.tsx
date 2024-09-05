import { Button, Dropdown, Image } from 'antd';
import { Footer as AntdFooter } from 'antd/es/layout/layout';
import Link from 'antd/es/typography/Link';
import { type JSX } from 'react';

import { coders } from '@/constants/coders';

import styles from './footer.module.css';

export default function Footer(): JSX.Element {
  return (
    <AntdFooter
      className={styles.footerStyle}
      style={{ backgroundColor: '#dde9ff', paddingBlock: 0, height: 64 }}
    >
      <Dropdown
        menu={{
          items: coders.map((coder) => ({
            key: coder.link,
            label: (
              <Link target="_blank" rel="noopener noreferrer" href={coder.link}>
                {coder.username}
              </Link>
            ),
          })),
        }}
        placement="topRight"
      >
        <Button
          style={{ backgroundColor: 'transparent', border: 'none' }}
          icon={
            <Image width={50} src="/github.png" alt="Github" preview={false} />
          }
        />
      </Dropdown>

      <p>© 2024 REST/GraphiQL Client</p>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        title="RS School"
      >
        <Image width={50} src="/rss-logo.svg" alt="RS School" preview={false} />
      </a>
    </AntdFooter>
  );
}
