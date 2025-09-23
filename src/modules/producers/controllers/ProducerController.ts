import { Request, Response } from 'express';
import { ProducerService } from '../services/ProducerService';

const producerService = new ProducerService();

export class ProducerController {
    async create(req: Request, res: Response) {
        const producer = await producerService.create(req.body);
        return res.status(201).json(producer);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const producer = await producerService.update(id, req.body);
        return res.json(producer);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const producer = await producerService.findById(id);
        if (!producer) {
            return res.status(404).json({ error: 'Producer not found' });
        }
        return res.json(producer);
    }

    async findAll(req: Request, res: Response) {
        const producers = await producerService.findAll();
        return res.json(producers);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await producerService.delete(id);
        return res.status(204).send();
    }
}