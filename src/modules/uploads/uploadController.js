import { uploadToS3, getImageDetailsById } from './uploadService.js';

// Upload single file
export const uploadSingle = async (req, res) => {
  try {
    const file = req.file;
    const fileData = await uploadToS3(file);

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: fileData,
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload multiple files
export const uploadMultiple = async (req, res) => {
  try {
    const files = req.files;
    const urls = [];

    for (const file of files) {
      const url = await uploadToS3(file);
      urls.push(url);
    }

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      data: urls,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get image details by ID
export const getImagesById = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDetails = await getImageDetailsById(id); // Implement this function to fetch image details from your database

    if (!imageDetails) {
      return res.status(404).json({ 
        success: false,
        message: 'Image not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Image details retrieved successfully',
      data: imageDetails,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to retrieve image details',
      data: null,
    });
  }
};