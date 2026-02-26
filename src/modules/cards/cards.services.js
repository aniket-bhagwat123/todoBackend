import cardsModel from "./cards.model.js";
import { validateRequiredFields } from "../../utils/validateRequiredFields.js";

export const getCardListService = async (request) => {
    const { page, limit, isActive, search, board_id } = request || {};

    let filter = { isDeleted: { $ne: true } };

    if (board_id) {
        filter.board_id = board_id;
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }

    if (search) {
        filter.$or = [
            { card_title: { $regex: search, $options: 'i' } },
        ];
    }

    if(page && limit) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const cards = await cardsModel.find(filter).skip(skip).limit(limitNumber);
        return cards;
    }

    const cards = await cardsModel.find(filter);
    return cards;
}

export const createCardService = async (request) => {
    validateRequiredFields(request, ['card_title', 'board_id']);

    const { card_title, description, board_id } = request;

    const existingCard = await cardsModel.findOne({ 
        card_title: card_title, 
        isDeleted: false 
    });

    if (existingCard) {
        throw new Error('Card with this title already exists');
    }

    const newCard = await cardsModel.create({ card_title, description, board_id });

    return newCard;
}

export const updateCardService = async (request) => {
    const { id, card_title, description, board_id, isActive } = request;

    if (!id) {
        throw new Error('Card ID is required for update');
    }

    const updatedCard = await cardsModel.findOneAndUpdate(
        { _id: id, isDeleted: { $ne: true } },
        { 
            ...(card_title && { card_title }),
            ...(description && { description }),
            ...(board_id && { board_id }),
            ...(isActive !== undefined && { isActive })
        },
        { new: true }
    );

    if (!updatedCard) {
        throw new Error('Card not found or has been deleted');
    }
    return updatedCard;
}

export const getCardByIdService = async (id) => {
    if (!id) {
        throw new Error('Card ID is required');
    }
    const card = await cardsModel.findOne({ _id: id, isDeleted: { $ne: true } });
    return card;
}

export const softDeleteCardService = async (id) => {
    if (!id) {
        throw new Error('Card ID is required for deletion');
    }
    const deletedCard = await cardsModel.findOneAndUpdate(
        { _id: id, isDeleted: { $ne: true } },
        { isDeleted: true },
        { new: true }
    );

    return deletedCard;
}