import { getBoards, createBoardService, updateBoardService, getBoardByIdService, boardDeleteService } from './boards.service.js';

export const getBoardList = async (req, res) => {
  try {
    const boards = await getBoards(req, res);
    if (boards?.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No boards found",
        data: {
            boards: [],
            pagination: {
                page: req.query.page || 1,
                limit: req.query.limit,
                records: 0,
            }
        }
      });
    };

    res.status(200).json({ 
        success: true,
        message: 'Boards fetched successfully',
        data: {
            boards: boards,
            pagination: {
                page: req.query.page || 1,
                limit: req.query.limit,
                records: boards.length,
            }
        },
    });
  } catch (error) {   
    res.status(500).json({ error: error.message || 'Failed to fetch boards' });
  }
};

export const createBoard = async (req, res) => {
  try {
    const boardData = req.body;
    const newBoard = await createBoardService(boardData);
    res.status(201).json({ 
        success: true,
        message: 'Board created successfully',
        data: newBoard
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create board' });
  }
};

export const updateBoard = async (req, res) => {
    try {
        const boardData = req.body;
        const updateBoardDetails = await updateBoardService(boardData);
        res.status(200).json({ 
            success: true,
            message: 'Board updated successfully',
            data: updateBoardDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update board' });   
    }
};

export const getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        const boardDetails = await getBoardByIdService(id);
        if (!boardDetails) {
            return res.status(404).json({
                success: false,
                message: 'Board not found',
                data: null
            });
        } 
        res.status(200).json({ 
            success: true,
            message: 'Board fetched successfully',
            data: boardDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch board details' });   
    } 
};

export const softDeleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const boardDelete = await boardDeleteService(id);
        if (!boardDelete) {
            return res.status(404).json({ 
                success: false,
                message: 'Board not found or already deleted',
            });
        };

        res.status(200).json({ 
            success: true,
            message: 'Board deleted successfully',
        });
    } catch (error) {   
        res.status(500).json({ error: error.message || 'Failed to delete board' });
    }
};