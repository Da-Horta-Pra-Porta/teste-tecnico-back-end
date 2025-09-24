// src/modules/admin/routes/admin.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { AdminController } from '../controllers/AdminController';
import { authMiddleware } from '../../../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const adminRoutes = Router();
const adminController = new AdminController();

// Middleware de Autorização: Apenas para Professores
const isProfessor = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== Role.PROFESSOR) {
    return res.status(403).json({ message: 'Access denied. Professors only.' });
  }
  next();
};

// Usamos o authMiddleware primeiro, depois o isProfessor
adminRoutes.get('/admin/students', authMiddleware, isProfessor, adminController.listStudents);

adminRoutes.get('/admin/students', authMiddleware, isProfessor, adminController.listStudents);

// Rota para criar um novo aluno (NOVA)
adminRoutes.post('/admin/students', authMiddleware, isProfessor, adminController.createStudent); 


// ...
adminRoutes.get('/admin/students', authMiddleware, isProfessor, adminController.listStudents);
adminRoutes.post('/admin/students', authMiddleware, isProfessor, adminController.createStudent);

// Rotas para atualizar e deletar um aluno (NOVAS)
adminRoutes.put('/admin/students/:studentId', authMiddleware, isProfessor, adminController.updateStudent); 
adminRoutes.delete('/admin/students/:studentId', authMiddleware, isProfessor, adminController.deleteStudent); 

adminRoutes.post('/admin/students/export', authMiddleware, isProfessor, adminController.exportStudents); 

export default adminRoutes;