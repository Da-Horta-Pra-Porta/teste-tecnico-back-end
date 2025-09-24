// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Limpa os dados existentes para evitar duplicatas
  await prisma.score.deleteMany();
  await prisma.user.deleteMany();

  // Cria um Professor
  const professorPassword = await hash('senha.professor', 10);
  const professor = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'Professor',
      email: 'professor@escola.com',
      password: professorPassword,
      role: Role.PROFESSOR,
    },
  });

  // Cria um Aluno
  const alunoPassword = await hash('senha.aluno', 10);
  const aluno = await prisma.user.create({
    data: {
      firstName: 'Fulano',
      lastName: 'de Tal',
      email: 'aluno@escola.com',
      password: alunoPassword,
      role: Role.ALUNO,
    },
  });

  // Cria algumas notas para o aluno
  await prisma.score.createMany({
    data: [
      { value: 8.5, studentId: aluno.id },
      { value: 9.0, studentId: aluno.id },
      { value: 7.0, studentId: aluno.id },
    ],
  });

  console.log('Seeding finished.');
  console.log('--- Usuários Criados ---');
  console.log('Professor:', { email: professor.email, password: 'senha.professor' });
  console.log('Aluno:', { email: aluno.email, password: 'senha.aluno' });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });