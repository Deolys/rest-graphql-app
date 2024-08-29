import type { GraphQLNamedType } from 'graphql';

import { DocItemTypes } from '../doc-item-types/doc-item-types';

interface DocTypeListProps {
  schemas: { [key: string]: GraphQLNamedType };
}

export function DocTypeList({ schemas }: DocTypeListProps): JSX.Element {
  return (
    <ul>
      {Object.entries(schemas).map(([key, value]) => {
        return (
          <li key={key + value}>
            <h2>{key}</h2>
            <DocItemTypes value={value} />
          </li>
        );
      })}
    </ul>
  );
}

export default DocTypeList;
