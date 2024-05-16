import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { VoteValidator } from "@/lib/validators/factoid";
import { z } from "zod";

export async function PATCH(req) {
    const session = await getAuthSession();

    if (session === null) {
        return new Response('🙏🏼Please login to vote', { status: 401 });
    }

    try {
        const body = await req.json();
        const { factoidId } = VoteValidator.parse(body);

        if (!factoidId) {
            return new Response('Post id is required', { status: 400 })
        }

        // Check if the user already liked the factoid
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_factoidId: {
                    userId: session.user.id,
                    factoidId,
                },
            },
        });

        if (existingVote) {
            return new Response('You have already voted on this factoid', { status: 400 })
        }

        // Create a new vote
        await prisma.vote.create({
            data: {
                userId: session.user.id,
                factoidId,
                type: 'UP',
            },
        });

        return new Response('Vote registered successfully', { status: 200 })
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return new Response('Invalid post request data passed', { status: 422 })
        }

        return new Response('Could not register your vote, please try again', { status: 500 })
    }
}