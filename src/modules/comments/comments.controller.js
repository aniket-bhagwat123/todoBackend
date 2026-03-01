import { getAllCommentsService, createCommentService, getCommentsByIdService, updateCommentService, deleteCommentService } from './comments.service.js';

export const getAllComments = async (req, res) => {
  try {
    const getAllComments = await getAllCommentsService(req);
    if (!getAllComments || getAllComments.length === 0) {
      return res.status(404).json({
        message: 'No comments found',
        data: {
            comments: [],
            pagination: {
                total: 0,
                page: req.query.page || 1,
                limit: req.query.limit || 10,
            },
        }
      });
    }

    res.status(200).json({ 
        message: 'Comments fetched successfully', 
        data: {
            comments: getAllComments,
            pagination: {
                total: getAllComments.length,
                page: req.query.page || 1,
                limit: req.query.limit || 10,
            },
        } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

export const createComment = async (req, res) => {
    try {
        const commentData = await createCommentService(req.body);

        res.status(200).json({
            success: true,
            message: 'Comment created successfully',
            data: commentData,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
}

export const updateComment = async (req, res) => {
    try {
        const updateData = updateCommentService(req.params.id, req.body);

        if (!updateData) {
            return res.status(404).json({ 
                success: false,
                message: 'Comment not found' 
            });
        };
        res.status(200).json({ 
            success: true,
            message: 'Comment updated successfully', 
            data: updateData 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};


export const getCommentById = async (req, res) => {
    try {
        const commentData = await getCommentsByIdService(req.params.comment_id);

        if (!commentData) {
            return res.status(404).json({ 
                success: false,
                message: 'Comment not found'
            });
        };
        res.status(200).json({ 
            success: true,
            message: 'Comment fetched successfully', 
            data: commentData 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const deleteData = await deleteCommentService(req.params.id);
        if (!deleteData) {
            return res.status(404).json({ 
                success: false,
                message: 'Comment not found' 
            });
        };
        res.status(200).json({ 
            success: true,
            message: 'Comment deleted successfully',
            data: deleteData
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};