// src/modules/student/controllers/StudentController.ts
import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

export class StudentController {
  async getStudentScores(req: Request, res: Response) {
    // O userId vem do token JWT, anexado pelo authMiddleware
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token.' });
    }

    const studentService = new StudentService();
    const studentDetails = await studentService.getStudentScores(userId);
    return res.json(studentDetails);
  }
}