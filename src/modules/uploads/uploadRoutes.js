import express from 'express';
import { upload } from '../../utils/uploadMiddleware.js';
import { uploadSingle, uploadMultiple, getImagesById } from './uploadController.js';
import { authenticate } from '../../utils/auth.middleware.js';

const router = express.Router();

router.post("/single", authenticate, upload.single("file"), uploadSingle);
router.post("/multiple", authenticate, upload.array("files", 5), uploadMultiple);
router.get("/get/:id", authenticate, getImagesById);

export default router;