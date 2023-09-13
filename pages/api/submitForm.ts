import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/server/utils/connectDB';
import { resolvers } from '@/server/graphql/resolvers';

export default async function submitForm(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    await connectDB();

    const { name, phoneNumber, consent, email } = req.body;
    console.log(req.body);
    try {
        const post = await resolvers.Mutation.createPost(null, {
            name,
            phoneNumber,
            consent,
            email,
        });

        if (!post) {
            return res
                .status(400)
                .json({ success: false, message: 'Failed to create post.' });
        }

        return res.status(200).json({ success: true, data: post });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
