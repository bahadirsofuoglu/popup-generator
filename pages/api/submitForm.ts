import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/server/utils/connectDB';
import { resolvers } from '@/server/graphql/resolvers';

// This is the API route for submitting the form.
// It takes the form data as input and saves it to the database(MongoDB). You can check server folder for the code.
// It is called when the user submits the form.

export default async function submitForm(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).send('OK');
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    await connectDB();

    const { name, phoneNumber, consent, email } = req.body;

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
        return res.status(500).json({ success: false, error: error });
    }
}
