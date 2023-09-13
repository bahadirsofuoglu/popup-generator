import Post from '../models/Post';

export const resolvers = {
    Mutation: {
        createPost: async (_: any, args: any) => {
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
