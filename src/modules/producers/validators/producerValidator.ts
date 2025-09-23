import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const BRAZILIAN_STATES = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'] as const;

export const producerSchema = z.object({
    cpfCnpj: z.string().refine((doc) => cpf.isValid(doc) || cnpj.isValid(doc), {
        message: "CPF or CNPJ is invalid.",
    }),
    name: z.string().min(3, "Name must be at least 3 characters long."),
    farmName: z.string().min(1, "Farm name is required."),
    city: z.string().min(1, "City is required."),
    state: z.enum(BRAZILIAN_STATES, { errorMap: () => ({ message: 'State is invalid.' }) }),
    totalArea: z.number().positive("Total area must be a positive number."),
    arableArea: z.number().min(0, "Arable area cannot be negative."),
    vegetationArea: z.number().min(0, "Vegetation area cannot be negative."),
    cultures: z.array(z.string().min(1)).min(1, "At least one culture must be provided."),
}).refine(data => data.arableArea + data.vegetationArea <= data.totalArea, {
    message: "The sum of arable and vegetation area cannot exceed the total area.",
    path: ["arableArea", "vegetationArea"],
});

export const updateProducerSchema = producerSchema.partial();