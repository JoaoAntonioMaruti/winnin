import postSchema from './postSchema';
import { gql } from 'apollo-server-express';

const rootSchema = gql`
  type Query
`;

const typeDefs = [
  rootSchema,
  postSchema
];

export { typeDefs };
