import { Card, Flex, Typography } from 'antd';
import Image from 'next/image';
import { useContext } from 'react';
import { type JSX } from 'react';

import handsHat from '@/assets/images/hands-hat.svg';
import { LanguageContext } from '@/providers/language';

export function CourseInfo(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <Flex>
      <Card hoverable style={{ height: 'fit-content' }}>
        <Typography style={{ textAlign: 'justify', textIndent: 40 }}>
          {t.aboutCourse}
        </Typography>
      </Card>
      <Image src={handsHat} alt="Hand with the hat" width={248} height={278} />
    </Flex>
  );
}
