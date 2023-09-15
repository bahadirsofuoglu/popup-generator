import Post from '../models/Post';

interface CreatePostArgs {
    name: string;
    phoneNumber: string;
    consent: boolean;
    email: string;
}

export const resolvers = {
    Mutation: {
        createPost: async (_: any, args: CreatePostArgs) => {
            const newPost = new Post(args);

            await newPost.save();

            return {
                name: args.name,
                phoneNumber: args.phoneNumber,
                consent: args.consent,
                email: args.email,
            };
        },
    },
};
