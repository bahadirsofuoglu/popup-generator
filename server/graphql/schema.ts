import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Query {
        exampleField: String
    }

    type Mutation {
        createPost(
            name: String
            phoneNumber: String
            consent: Boolean
            email: String
        ): Post
    }

    type Post {
        name: String
        phoneNumber: String
        consent: Boolean
        email: String
    }
`;
