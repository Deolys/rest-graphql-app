import { assert, describe, test } from 'vitest';

import { prettifyGraphQL } from '@/utils/prettify-graphql';

type Query = { query: string; expected: string };

const ERR_MESSAGE = 'Error: Syntax Error: Unexpected Name';
const queries: Query[] = [
  {
    query: '',
    expected: '',
  },
  {
    query: '{hero{name}}',
    expected: '{\n  hero {\n    name \n  }\n}',
  },
  {
    query: `{hero {name
    # Queries can have comments!
    friends {name}}}`,
    expected:
      '{\n  hero {\n    name \n    # Queries can have comments!\n    friends {\n      name \n    }\n  }\n}',
  },
  {
    query: '{human(id: "1000") {name\nheight}}',
    expected: '{\n  human(id: "1000") {\n    name \n    height \n  }\n}',
  },
  {
    query: '{human(id: "1000") {name height(unit: FOOT)}}',
    expected:
      '{\n  human(id: "1000") {\n    name \n    height(unit: FOOT) \n  }\n}',
  },
  {
    query:
      '{  empireHero: hero(episode: EMPIRE) {    name  }  jediHero: hero(episode: JEDI) {    name  }}',
    expected:
      '{\n  empireHero: hero(episode: EMPIRE) {\n    name \n  }\n  jediHero: hero(episode: JEDI) {\n    name \n  }\n}',
  },
  {
    query: `{leftComparison: hero(episode: EMPIRE) {...comparisonFields}rightComparison: hero(episode: JEDI) {...comparisonFields}}fragment comparisonFields on Character {name
  appearsIn
  friends {name}}`,
    expected:
      '{\n  leftComparison: hero(episode: EMPIRE) {\n    ...comparisonFields \n  }\n  rightComparison: hero(episode: JEDI) {\n    ...comparisonFields \n  }\n}\nfragment comparisonFields on Character {\n  name \n  appearsIn \n  friends {\n    name \n  }\n}',
  },
  {
    query: `query HeroComparison($first: Int = 3) {leftComparison: hero(episode: EMPIRE) {...comparisonFields
  }rightComparison: hero(episode: JEDI) {...comparisonFields}}

fragment comparisonFields on Character {name
  friendsConnection(first: $first) {totalCount
    edges {node {name}}}}`,
    expected:
      'query HeroComparison($first: Int = 3) {\n  leftComparison: hero(episode: EMPIRE) {\n    ...comparisonFields \n  }\n  rightComparison: hero(episode: JEDI) {\n    ...comparisonFields \n  }\n}\nfragment comparisonFields on Character {\n  name \n  friendsConnection(first: $first) {\n    totalCount \n    edges {\n      node {\n        name \n      }\n    }\n  }\n}',
  },
  {
    query: `query HeroNameAndFriends {hero {name
    friends {name}}}`,
    expected:
      'query HeroNameAndFriends {\n  hero {\n    name \n    friends {\n      name \n    }\n  }\n}',
  },
  {
    query: `query HeroNameAndFriends($episode: Episode) {hero(episode: $episode) {name
    friends {name}}}`,
    expected:
      'query HeroNameAndFriends($episode: Episode) {\n  hero(episode: $episode) {\n    name \n    friends {\n      name \n    }\n  }\n}',
  },
  {
    query: `query HeroNameAndFriends($episode: Episode = JEDI) {hero(episode: $episode) {name
    friends {name}}}`,
    expected:
      'query HeroNameAndFriends($episode: Episode = JEDI) {\n  hero(episode: $episode) {\n    name \n    friends {\n      name \n    }\n  }\n}',
  },
  {
    query: `query Hero($episode: Episode, $withFriends: Boolean!) {hero(episode: $episode) {name
    friends @include(if: $withFriends) {name}}}`,
    expected:
      'query Hero($episode: Episode $withFriends: Boolean!) {\n  hero(episode: $episode) {\n    name \n    friends @include(if: $withFriends) {\n      name \n    }\n  }\n}',
  },
  {
    query: `query HeroForEpisode($ep: Episode!) {hero(episode: $ep) {name
    ... on Droid {primaryFunction}
    ... on Human {height}}}`,
    expected:
      'query HeroForEpisode($ep: Episode!) {\n  hero(episode: $ep) {\n    name \n    ...on Droid {\n      primaryFunction \n    }\n    ...on Human {\n      height \n    }\n  }\n}',
  },
  {
    query: `{search(text: "an") {__typename
    ... on Human {name}
    ... on Droid {name}
    ... on Starship {name}}}`,
    expected:
      '{\n  search(text: "an") {\n    __typename \n    ...on Human {\n      name \n    }\n    ...on Droid {\n      name \n    }\n    ...on Starship {\n      name \n    }\n  }\n}',
  },
];

function msg(expected: string, result: string | Error): string {
  return 'expected: "' + expected + '".\n But got: "' + result + '"';
}

describe('prettifyGraphQL', () => {
  test('must return prettified string', () => {
    queries.forEach(({ query, expected }) => {
      const result = prettifyGraphQL(query);
      assert(result === expected, msg(expected, result));
    });
  });
  test('must return an error string', () => {
    const result = prettifyGraphQL('bad query');
    assert(result.toString().includes(ERR_MESSAGE), msg(ERR_MESSAGE, result));
  });
});
