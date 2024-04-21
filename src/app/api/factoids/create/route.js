import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { FactoidValidator } from "@/lib/validators/factoid";
import { z } from "zod";

export async function POST(req) {
    try {
        const session = await getAuthSession();

        if (session === null) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { description, explanation, categories } = FactoidValidator.parse(body);

        const newFactoid = await prisma.factoid.create({
            data: {
                description: description,
                note: explanation,
                authorId: session.user.id,
                categories: {
                    connectOrCreate: categories ? categories.map((category) => ({
                        where: { name: category },
                        create: { name: category }
                    })) : [],
                },
            }
        });

        return new Response(JSON.stringify(newFactoid), { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid post request data passed', { status: 422 })
        }
        console.error(error)
        return new Response('Could not create post request', { status: 500 });
    }
}