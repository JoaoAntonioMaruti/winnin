import { gql } from 'apollo-server-express';

const postSchema = gql`
  type Post {
    id: ID!
    title: String!
    author: String!
    created_at: String!
    ups: Int!
    comments_count: Int!
  }

  type Author {
    author: String!
    total_ups: String!
    total_comments:  String!
  }

  type Query {
    posts(
      startDate: String!,
      endDate: String!,
      sortBy: String!
    ): [Post!]!

    authors(
      sortBy: String!
    ): [Author!]!
  }
 `;

export default postSchema;
