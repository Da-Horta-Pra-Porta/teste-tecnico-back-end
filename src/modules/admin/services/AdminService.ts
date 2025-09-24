// src/modules/admin/services/AdminService.ts
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export class AdminService {
  

exportStudents() {
  console.log('Export process started in the background...');

  // Simula uma operação demorada sem bloquear a resposta
  setTimeout(async () => {
    try {
      const students = await this.listStudents({}); // Pega todos os alunos
      console.log('--- RELATÓRIO DE ALUNOS (Simulação de CSV) ---');
      console.log('ID, Nome, Sobrenome, Email, Média, Situação');
      students.data.forEach(student => {
        console.log(`${student.id},${student.firstName},${student.lastName},${student.email},${student.average},${student.situation}`);
      });
      console.log('--- FIM DO RELATÓRIO ---');
      console.log('Export process finished.');
    } catch (error) {
      console.error('Error during background export:', error);
    }
  }, 5000); // Atraso de 5 segundos para simular o trabalho
}
// ... }

async listStudents(query: {
  page?: string;
  limit?: string;
  name?: string;
  situation?: string;
}) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const whereClause: any = {
    role: Role.ALUNO,
  };

  if (query.name) {
    whereClause.OR = [
      { firstName: { contains: query.name, mode: 'insensitive' } },
      { lastName: { contains: query.name, mode: 'insensitive' } },
    ];
  }

  
  const students = await prisma.user.findMany({
    where: whereClause,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      scores: {
        select: {
          value: true,
        },
      },
    },
  });

  // Calcula a média e a situação para cada aluno
  let studentsWithDetails = students.map((student) => {
    const totalScore = student.scores.reduce((acc, score) => acc + score.value, 0);
    const average = student.scores.length > 0 ? totalScore / student.scores.length : 0;

    let situation = 'Reprovado';
    if (average >= 7) {
      situation = 'Aprovado';
    } else if (average >= 5) {
      situation = 'Recuperação';
    }

    const { scores, ...studentData } = student;
    return {
      ...studentData,
      average: parseFloat(average.toFixed(2)),
      situation,
    };
  });

  // Se houver filtro por situação, aplica-o agora (após o cálculo)
  if (query.situation) {
    studentsWithDetails = studentsWithDetails.filter(
      (student) => student.situation.toLowerCase() === query.situation?.toLowerCase()
    );
  }

  const totalStudents = studentsWithDetails.length;
  const paginatedStudents = studentsWithDetails.slice(skip, skip + limit);

  return {
    total: totalStudents,
    page,
    limit,
    totalPages: Math.ceil(totalStudents / limit),
    data: paginatedStudents,
  };
}

  async createStudent(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    initialScores?: number[];
  }) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const hashedPassword = await hash(data.password, 10);

    const newStudent = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: Role.ALUNO,
        scores: {
          createMany: {
            data: data.initialScores ? data.initialScores.map(value => ({ value })) : [],
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        scores: { select: { id: true, value: true } },
      },
    });

    return newStudent;
  }

  async updateStudent(studentId: string, data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    newScores?: number[];
  }) {
    const student = await prisma.user.findUnique({
      where: { id: studentId, role: Role.ALUNO },
    });

    if (!student) {
      throw new Error('Student not found.');
    }

    if (data.email && data.email !== student.email) {
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser && existingUser.id !== studentId) {
        throw new Error('Email already in use by another user.');
      }
    }

    const hashedPassword = data.password ? await hash(data.password, 10) : undefined;

    const updatedStudent = await prisma.user.update({
      where: { id: studentId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        scores: { select: { id: true, value: true } },
      },
    });

    if (data.newScores && data.newScores.length > 0) {
      await prisma.score.createMany({
        data: data.newScores.map(value => ({ value, studentId })),
      });
    }

    return prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        scores: { select: { id: true, value: true } },
      },
    });
  }

  async deleteStudent(studentId: string) {
    const student = await prisma.user.findUnique({
      where: { id: studentId, role: Role.ALUNO },
    });

    if (!student) {
      throw new Error('Student not found.');
    }

    await prisma.score.deleteMany({ where: { studentId } });
    await prisma.user.delete({ where: { id: studentId } });

    return { message: 'Student deleted successfully.' };
  }
}