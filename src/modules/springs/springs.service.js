import Spring from '../../models/spring.model.js';

// SERVICE TO GET ALL SPRINGS WITH FILTERING AND PAGINATION
export const getAllSprings = async (req, res) => {
    const { page, limit, isActive, search } = req.query || {};
    const filters = { isDeleted: false };

    if (isActive !== undefined) {
        filters.isActive = isActive === 'true';
    }

    if (search) {
        filters.spring_name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    if (page && limit) {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        const springs = await Spring.find(filters).skip(skip).limit(limitNumber);
        return springs;
    }

    // Add filtering logic here based on req.query parameters if needed
    const springs = await Spring.find(filters);
    return springs;
}

// SERVICE TO CREATE A NEW SPRING
export const createSpring = async (springData) => {
    const newSpring = new Spring(springData);
    await newSpring.save();
    return newSpring;
}