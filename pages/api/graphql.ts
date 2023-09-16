import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@/server/graphql/schema';
import { resolvers } from '@/server/graphql/resolvers';
import connectDB from '@/server/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

// This is an API route specifically designed for testing the GraphQL server.
// It is not actively used in the client application because the client does not perform GraphQL queries.
// The code serves as a testing utility to ensure the GraphQL server is working as expected.
// To enable this testing environment, wrap this route with the Apollo Server Provider.

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }

    await connectDB();
    await apolloServer.start();
    return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
