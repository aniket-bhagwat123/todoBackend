import { createCardService, getCardByIdService, getCardListService, updateCardService, softDeleteCardService } from "./cards.services.js";

export const getCardList = async (req, res) => {
  try {
    const cards = await getCardListService(req.query);

    if (!cards || cards.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No cards found",
            data: {
                cards: [],
                meta: {
                    page: req.query.page || 1,
                    limit: req.query.limit,
                    totalRecords: 0,
                },
            },
        });
    };
    
    // Your logic to get the list of cards
    res.status(200).json({
      success: true,
        message: 'Card list fetched successfully',
        data: {
          cards: cards, // Replace with actual card data
          meta: {
            page: 1,
            limit: 10,
            totalRecords: cards.length,
            },
        },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch card list' });
  }
};

export const createCard = async (req, res) => {
    try {
        const cardData = await createCardService(req.body);
        res.status(201).json({
            success: true,
            message: 'Card created successfully',
            data: cardData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to create card' });
    }
}

export const updateCard = async (req, res) => {
    try {
        const cardData = await updateCardService(req.body);
        res.status(200).json({ 
            success: true, 
            message: 'Card updated successfully', 
            data: cardData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update card' });
    }
}

export const getCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await getCardByIdService(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'Card not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Card fetched successfully',
            data: card,
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch card' });
    }
};

export const softDeleteCard = async (req, res) => {
    const { id } = req.params;
    const deletedCard = await softDeleteCardService(id);

    if (!deletedCard) {
        return res.status(404).json({
            success: false,
            message: 'Card not found or already deleted',
        });
    }
    res.status(200).json({
        success: true,
        message: 'Card deleted successfully',
        data: deletedCard,
    });
};