import { gql } from 'apollo-server-express';

const postSchema = gql`
  type Post {
    id: ID!
    title: String!
    author: String!
    created_at: String!
    ups: Int!
    comments_count: Int
  }

  type Query {
    posts(
      startDate: String!,
      endDate: String!,
      sortBy: String!
    ): [Post!]!
  }
`;

export default postSchema;
