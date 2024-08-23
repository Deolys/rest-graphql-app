import { type JSX } from 'react';
import { Image, Flex } from 'antd';
import { Footer as AntdFooter } from 'antd/es/layout/layout';
import Link from 'antd/es/typography/Link';
import { coders } from '@/constants/coders';
import styles from './footer.module.css';

export default function Footer(): JSX.Element {
  return (
    <AntdFooter
      className={styles.footerStyle}
      style={{ backgroundColor: '#f9f2ff', paddingBlock: 0 }}
    >
      <Flex gap={16} align="center">
        <Image width={50} src="/github.png" alt="Github" preview={false} />
        <Flex vertical>
          {coders.map((coder) => {
            return (
              <Link
                key={coder.link}
                href={coder.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coder.username}
              </Link>
            );
          })}
        </Flex>
      </Flex>

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
