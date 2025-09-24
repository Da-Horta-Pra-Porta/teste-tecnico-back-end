import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';
import { createStudentSchema, updateStudentSchema } from '../validators/studentValidator';

export class AdminController {
  
async listStudents(req: Request, res: Response) {
  const adminService = new AdminService();
  const students = await adminService.listStudents(req.query); 
  return res.json(students);
}

// ... dentro da classe AdminController { ...
async exportStudents(req: Request, res: Response) {
  const adminService = new AdminService();
  adminService.exportStudents(); 

  return res.status(202).json({
    message: 'Export process started. The report will be generated in the background.',
  });
}
// ... }

  // Método para criar um novo aluno
  async createStudent(req: Request, res: Response) {
    const parsedBody = createStudentSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ errors: parsedBody.error.flatten().fieldErrors });
    }

    const { firstName, lastName, email, password, initialScores } = parsedBody.data;

    const adminService = new AdminService();
    const newStudent = await adminService.createStudent({ firstName, lastName, email, password, initialScores });

    return res.status(201).json(newStudent);
  }

  // Método para atualizar um aluno
  async updateStudent(req: Request, res: Response) {
    const { studentId } = req.params;
    const parsedBody = updateStudentSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ errors: parsedBody.error.flatten().fieldErrors });
    }

    const dataToUpdate = parsedBody.data;

    const adminService = new AdminService();
    const updatedStudent = await adminService.updateStudent(studentId, dataToUpdate);

    return res.json(updatedStudent);
  }

  // Método para deletar um aluno
  async deleteStudent(req: Request, res: Response) {
    const { studentId } = req.params;

    const adminService = new AdminService();
    const result = await adminService.deleteStudent(studentId);

    return res.status(200).json(result);
  }
} 