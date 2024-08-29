'use client';

import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import type { GraphQLNamedType } from 'graphql';
import { type ReactNode, useContext, useState } from 'react';

import { LanguageContext } from '@/providers/language';

import { DocTypeList } from './doc-type-list';

interface DocumentationProps {
  schemas: { [key: string]: GraphQLNamedType };
}

export function Documentation({ schemas }: DocumentationProps): ReactNode {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { t } = useContext(LanguageContext);

  if (Object.keys(schemas).length === 0) {
    return null;
  }

  return (
    <Sider
      width={420}
      collapsedWidth={0}
      theme="light"
      collapsible
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
      zeroWidthTriggerStyle={{ backgroundColor: '#badaff' }}
    >
      <div style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '10px' }}>
        {!isCollapsed && (
          <>
            <Title level={3}>{t.documentation}</Title>
            <DocTypeList schemas={schemas} />
          </>
        )}
      </div>
    </Sider>
  );
}

export default Documentation;
