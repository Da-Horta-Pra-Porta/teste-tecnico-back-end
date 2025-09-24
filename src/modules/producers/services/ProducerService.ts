import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProducerData {
    cpfCnpj: string;
    name: string;
    farmName: string;
    city: string;
    state: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
    cultures: string[];
}

export class ProducerService {
    async create(data: ProducerData) {
        const existingProducer = await prisma.producer.findUnique({ where: { cpfCnpj: data.cpfCnpj } });
        if (existingProducer) {
            throw new Error("Producer with this CPF/CNPJ already exists.");
        }

        const cultureOps = data.cultures.map(cultureName => ({
            where: { name: cultureName },
            create: { name: cultureName },
        }));

        return prisma.producer.create({
            data: {
                ...data,
                cultures: {
                    connectOrCreate: cultureOps,
                },
            },
            include: { cultures: true },
        });
    }

    async update(id: string, data: Partial<ProducerData>) {
        const updateData: any = { ...data };

        if (data.cultures) {
            const cultureOps = data.cultures.map(cultureName => ({
                where: { name: cultureName },
                create: { name: cultureName },
            }));
            updateData.cultures = {
                set: [],
                connectOrCreate: cultureOps,
            };
        }

        return prisma.producer.update({
            where: { id },
            data: updateData,
            include: { cultures: true },
        });
    }

    async findById(id: string) {
        return prisma.producer.findUnique({
            where: { id },
            include: { cultures: true },
        });
    }

    async findAll() {
        return prisma.producer.findMany({ include: { cultures: true } });
    }

    async delete(id: string) {
        return prisma.producer.delete({ where: { id } });
    }
}