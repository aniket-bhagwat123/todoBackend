import Comment from './comments.model.js';
import User from '../user/user.model.js';

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

        const User_data = await User.findById(author);
        
        const userDetails = {
            name: User_data.name,
            email: User_data.email
        };

        const newComment = new Comment({
            message,
            user_id: author,
            user_details: userDetails,
            card_id
        });

        const savedComment = await newComment.save();
        return savedComment;
    } catch (error) {
        throw new Error(error.message || 'Failed to create comment');
    }
};

export const updateCommentService = async (comment_id, updateData) => {
    try {
        const updatedComment = await Comment.findOneAndUpdate(
            { _id: comment_id, isDeleted: { $ne: true } },
            updateData,
            { new: true }
        );
        return updatedComment;
    } catch (error) {
        throw new Error(error.message || 'Failed to update comment');
    }
};

export const getCommentsByIdService = async (comment_id) => {
    try {
        const comment = await Comment.findOne({ _id: comment_id, isDeleted: { $ne: true } });
        return comment;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch comment by ID');
    }
};

export const deleteCommentService = async (comment_id) => {
  try {
    const deletedComment = await Comment.findOneAndUpdate(
      { _id: comment_id, isDeleted: { $ne: true } },
      { isDeleted: true },
      { new: true }
    );
    return deletedComment;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete comment');
  }
};