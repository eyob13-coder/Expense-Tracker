import express from 'express';
import authorize from '../middlewares/authMiddleware.js';
import getDashboardData from '../controllers/dashboardController.js'

const router = express.Router();

router.get("/", authorize, getDashboardData);


export default router;