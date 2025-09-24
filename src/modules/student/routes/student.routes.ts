// src/modules/student/routes/student.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { StudentController } from '../controllers/StudentController';
import { authMiddleware } from '../../../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const studentRoutes = Router();
const studentController = new StudentController();

// Middleware de Autorização: Apenas para Alunos
const isAluno = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== Role.ALUNO) {
    return res.status(403).json({ message: 'Access denied. Students only.' });
  }
  next();
};

// Usamos o authMiddleware primeiro, depois o isAluno
studentRoutes.get('/student/scores', authMiddleware, isAluno, studentController.getStudentScores);

export default studentRoutes;