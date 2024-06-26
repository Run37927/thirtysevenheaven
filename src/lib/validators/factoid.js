import { z } from 'zod'

export const FactoidValidator = z.object({
    description: z.string().min(4, { message: "description must be at least 4 characters" }).max(255),
    explanation: z.string().min(4, { message: "explanation must be at least 4 characters" }),
    categories: z.array(z.string()),
})

export const VoteValidator = z.object({
    factoidId: z.string(),
})