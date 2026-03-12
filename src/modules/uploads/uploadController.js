import { uploadToS3 } from './uploadService.js';

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