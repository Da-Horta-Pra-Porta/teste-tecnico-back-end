// src/modules/admin/validators/studentValidator.ts
import { z } from 'zod';
import { Role } from '@prisma/client';

// Schema base para a criação/atualização de alunos
export const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  // A role será definida pelo backend como ALUNO, não deve vir na requisição do professor
  // Mas para fins de validação interna se precisar, pode ser Role.ALUNO
  // role: z.nativeEnum(Role).optional(),
});

// Schema para criação de aluno (apenas os campos obrigatórios)
export const createStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  initialScores: z.array(z.number().min(0).max(10)).optional(), // Notas iniciais opcionais
});

// Schema para atualização de aluno (todos os campos opcionais)
export const updateStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').optional(),
  lastName: z.string().min(1, 'Last name is required.').optional(),
  email: z.string().email('Invalid email format.').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long.').optional(),
  newScores: z.array(z.number().min(0).max(10)).optional(), // Novas notas a serem adicionadas
  // Note: Não estamos permitindo a remoção/edição de notas existentes aqui, apenas adição.
  // Uma implementação mais completa teria endpoints específicos para notas.
}).partial(); // .partial() faz todos os campos serem opcionais, essencial para PUT