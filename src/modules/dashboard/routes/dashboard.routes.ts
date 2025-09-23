import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.get('/', dashboardController.getReport);

export default dashboardRoutes;