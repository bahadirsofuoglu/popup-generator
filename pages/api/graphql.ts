import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@/server/graphql/schema';
import { resolvers } from '@/server/graphql/resolvers';
import connectDB from '@/server/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

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
    await apolloServer.start(); // server.start() fonksiyonunu çağır
    return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
