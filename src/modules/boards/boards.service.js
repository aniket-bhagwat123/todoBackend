import boardsModel from './boards.model.js';

export const getBoards = async (req, res) => {
    try {
        const { page, limit, isActive, search } = req.query || {};
        let filter = { isDeleted: { $ne: true } };

        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        if (search) {
            filter.$or = [
                { board_title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if(page && limit) {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;
            const boards = await boardsModel.find(filter).skip(skip).limit(limitNumber);
            return boards;
        }

        const boards = await boardsModel.find(filter);
        return boards;
    } catch (error) {   
        res.status(500).json({ error: error.message || 'Failed to fetch boards' });
    }
};

export const createBoardService = async (boardData) => {
    try {
        const { board_title, description } = boardData;

        if (!board_title) {
            throw new Error('Board title is required');
        }

        if(!description) {
            throw new Error('Board description cannot be empty');
        }
        
        const existingBoard = await boardsModel.findOne({ board_title: board_title, isDeleted: false });
        if (existingBoard) {
            throw new Error('Board with this title already exists');
        }

        const newBoard = await boardsModel.create({ board_title, description });

        return newBoard;
    } catch (error) {
        throw new Error(error.message || 'Failed to create board');
    }
}

export const updateBoardService = async (boardData) => {
    try {
        const { board_id, board_title, description, isActive } = boardData;
        if (!board_id) {
            throw new Error('Board ID is required for update');
        }

        if (!board_title && !description && isActive === undefined) {
            throw new Error('At least one field (board_title, description, isActive) must be provided for update');
        }
        
        const checkBoard = await boardsModel.findOne({ _id: board_id, isDeleted: false });
        if (!checkBoard) {
            throw new Error('Board not found');
        }

        if (board_title !== undefined) checkBoard.board_title = board_title;
        if (description !== undefined) checkBoard.description = description;
        if (isActive !== undefined) checkBoard.isActive = isActive;

        const updatedBoard = await checkBoard.save();
        return updatedBoard;
    } catch (error) {
        throw new Error(error.message || 'Failed to update board');
    }
};

export const getBoardByIdService = async (board_id) => {
    try {
        const boardDetails = await boardsModel.findOne({ _id: board_id, isDeleted: false });
        return boardDetails;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch board details');
    }   
};

export const boardDeleteService = async (board_id) => {
    try {
        const deletedBoard = await boardsModel.findByIdAndUpdate(
            board_id,
            { isDeleted: true },
            { new: true }
        );

        if (!deletedBoard) {
            throw new Error("Board not found or already deleted");
        };
        
        return deletedBoard;
    } catch (error) {
        throw new Error(error.message || 'Failed to delete board');
    }
};