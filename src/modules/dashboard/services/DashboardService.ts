import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DashboardService {
    async getReport() {
        const totalFarms = await prisma.producer.count();

        const totalAreaAgg = await prisma.producer.aggregate({
            _sum: { totalArea: true },
        });

        const byState = await prisma.producer.groupBy({
            by: ['state'],
            _count: { _all: true },
        });

        const byCulture = await prisma.culture.findMany({
            select: {
                name: true,
                _count: {
                    select: { producers: true },
                },
            },
        });

        const byLandUse = await prisma.producer.aggregate({
            _sum: {
                arableArea: true,
                vegetationArea: true,
            },
        });

        return {
            totalFarms,
            totalArea: totalAreaAgg._sum.totalArea || 0,
            byState: byState.map(item => ({ state: item.state, count: item._all })),
            byCulture: byCulture.map(item => ({ culture: item.name, count: item._count.producers })),
            byLandUse: {
                arableArea: byLandUse._sum.arableArea || 0,
                vegetationArea: byLandUse._sum.vegetationArea || 0,
            },
        };
    }
}