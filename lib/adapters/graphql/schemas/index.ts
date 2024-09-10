import redditPostSchema from './redditPostSchema';
import { gql } from 'apollo-server-express';

const rootSchema = gql`
  type Query
`;

const typeDefs = [
  rootSchema,
  redditPostSchema
];

export { typeDefs };
