import { Router } from 'express';
import { ProducerController } from '../controllers/ProducerController';
import { validate } from '../../../middlewares/validationMiddleware';
import { producerSchema, updateProducerSchema } from '../validators/producerValidator';

const producerRoutes = Router();
const producerController = new ProducerController();

producerRoutes.post('/', validate(producerSchema), producerController.create);
producerRoutes.put('/:id', validate(updateProducerSchema), producerController.update);
producerRoutes.get('/:id', producerController.findById);
producerRoutes.get('/', producerController.findAll);
producerRoutes.delete('/:id', producerController.delete);

export default producerRoutes;