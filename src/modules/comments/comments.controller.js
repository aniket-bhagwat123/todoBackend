import { getAllCommentsService, createCommentService } from './comments.service.js';

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

        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: commentData,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
}