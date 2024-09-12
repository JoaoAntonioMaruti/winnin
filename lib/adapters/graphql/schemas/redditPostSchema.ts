import { gql } from 'apollo-server-express';

const postSchema = gql`
  enum SortBy {
    ups
    comments
  }

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
      sortBy: SortBy!
    ): [Post!]!

    authors(
      sortBy: SortBy!
    ): [Author!]!
  }
 `;

export default postSchema;
