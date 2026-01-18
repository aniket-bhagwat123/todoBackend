import { getAllSprings, createSpring } from './springs.service.js';

// GET ALL SPRINGS WITH FILTERING AND PAGINATION
export const getSpringList = async (req, res) => {
  try {
    const springs = await getAllSprings(req, res);

    if (springs?.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No springs found",
        data: {
            springs: [],
            pagination: { 
              page: req.query.page || 1, 
              limit: req.query.limit,
              records: 0,
            }
        }
      });
    }

    res.status(200).json({ 
        success: true,
        message: 'Springs fetched successfully',
        data: {
            springs: springs,
            pagination: { 
                page: req.query.page || 1, 
                limit: req.query.limit,
                records: springs.length,
            }
        },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch springs' });
  }
};

// CREATE A NEW SPRING
export const createSpring = async (req, res) => {
  try {
    const springData = req.body;
    const newSpring = await createSpring(springData);
    res.status(201).json({ data: newSpring });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create spring' });
  }
};