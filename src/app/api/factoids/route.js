import prisma from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
    const url = new URL(req.url);

    try {
        const { limit, page } = z.object({
            limit: z.string(),
            page: z.string(),
        }).parse({
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page'),
        })

        const factoids = await prisma.factoid.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
                categories: true,
            },
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
        });

        return new Response(JSON.stringify(factoids));
    } catch (error) {
        // console.log(error)
        if (error instanceof z.ZodError) {
            return new Response('Invalid post request data passed', { status: 422 });
        }
        return new Response('Could not fetch more factoids', { status: 500 })
    }
}