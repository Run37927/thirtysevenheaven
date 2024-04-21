import { z } from 'zod'

export const FactoidValidator = z.object({
    description: z.string().min(4, { message: "description must be at least 4 characters" }).max(255),
    explanation: z.string().min(4, { message: "explanation must be at least 4 characters" }).max(255),
    categories: z.array(z.string()),
})