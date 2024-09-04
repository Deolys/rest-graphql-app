import { Card, Flex, Typography } from 'antd';
import Image from 'next/image';
import { useContext } from 'react';
import { type JSX } from 'react';

import handsPoint from '@/assets/images/hands-point.svg';
import { LanguageContext } from '@/providers/language';

export function ProjectInfo(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <Flex gap={40}>
      <Image src={handsPoint} alt="Hand with the light bulb" priority={false} />
      <Flex align="center">
        <Card
          title={t.aboutProjectTitle}
          hoverable
          style={{ height: 'fit-content' }}
        >
          <Typography style={{ textAlign: 'justify', textIndent: 40 }}>
            {t.projectDescription1}
          </Typography>
          <Typography style={{ textAlign: 'justify', textIndent: 40 }}>
            {t.projectDescription2}
          </Typography>
        </Card>
      </Flex>
    </Flex>
  );
}
