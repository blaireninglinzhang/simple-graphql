const Post = require('./models/Post.model');

const resolvers = {
    Query: {
        getAllPosts: async () => {
            return await Post.find();
        },
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title, description });
            await post.save()
            return post;
        },
        updatePost: async (parent, args, context, info) => {
            const { id } = args;
            const { title, description } = args.post;
            const updates = {};
            if (title !== undefined) {
                updates.title = title;
            }
            if (description !== undefined) {
                updates.description = description;
            }
            const post = await Post.findByIdAndUpdate(
                id, 
                updates,
                { new: true }
            );
            return post;
        }
    }
}

module.exports = resolvers;