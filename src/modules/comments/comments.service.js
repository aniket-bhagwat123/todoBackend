import Comment from './comments.model.js';

export const getAllCommentsService = async (req) => {
    try {
        const { page, limit, card_id } = req.query;

        const filter = {
            isDeleted: { $ne: true },
        };

        if (card_id) {
            filter.card_id = card_id;
        };

        if(page && limit) {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const comments = await Comment.find(filter).skip(skip).limit(limitNumber);
            return comments
        };

        const comments = await Comment.find(filter);
        return comments;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch comments');
    }
};

export const createCommentService = async (data_) => {
    try {
        const { message, author, card_id } = data_;

        if (!message || !author || !card_id) {
            throw new Error('Message, author, and card_id are required to create a comment');
        }

        const newComment = new Comment({
            message,
            author,
            card_id
        });

        const savedComment = await newComment.save();
        return savedComment;
    } catch (error) {
        throw new Error(error.message || 'Failed to create comment');
    }
};