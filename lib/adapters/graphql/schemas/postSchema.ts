import { gql } from 'apollo-server-express';

const postSchema = gql`
  type Post {
    id: ID!
    title: String!
    author: String!
    createdAt: String!
    ups: Int!
    comments: Int!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {}
`;

export default postSchema;
