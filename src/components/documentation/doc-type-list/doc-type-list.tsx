import { Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import type { GraphQLNamedType } from 'graphql';

import { DocItemTypes } from '../doc-item-types/doc-item-types';

interface DocTypeListProps {
  schemas: { [key: string]: GraphQLNamedType };
}

export function DocTypeList({ schemas }: DocTypeListProps): JSX.Element {
  return (
    <ul>
      {Object.entries(schemas).map(([key, value]) => (
        <li key={key + value}>
          <Divider />
          <Title level={4}>{key}</Title>
          <DocItemTypes value={value} />
        </li>
      ))}
    </ul>
  );
}

export default DocTypeList;
