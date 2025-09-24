// src/modules/student/services/StudentService.ts
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export class StudentService {
  async getStudentScores(userId: string) {
    const student = await prisma.user.findUnique({
      where: { id: userId, role: Role.ALUNO }, // Garante que é um aluno e o ID corresponde
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        scores: {
          select: {
            id: true,
            value: true,
            createdAt: true,
          },
        },
      },
    });

    if (!student) {
      throw new Error('Student not found or not authorized.');
    }

    const totalScore = student.scores.reduce((acc, score) => acc + score.value, 0);
    const average = student.scores.length > 0 ? totalScore / student.scores.length : 0;

    let situation = 'Reprovado';
    if (average >= 7) {
      situation = 'Aprovado';
    } else if (average >= 5) {
      situation = 'Recuperação';
    }

    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      scores: student.scores,
      average: parseFloat(average.toFixed(2)),
      situation,
    };
  }
}