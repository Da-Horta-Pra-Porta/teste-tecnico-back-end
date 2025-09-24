import { Request, Response } from 'express';
import { DashboardService } from '../services/DashboardService';

export class DashboardController {
    async getReport(req: Request, res: Response) {
        const dashboardService = new DashboardService();
        const report = await dashboardService.getReport();
        return res.json(report);
    }
}