import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";

export async function DELETE(req) {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'admin') {
        return new Response('Unauthorized', { status: 401 });
    }

    const { factoidId } = await req.json();

    const deleteVotes = prisma.vote.deleteMany({
        where: {
            factoidId
        }
    })
    const deletePost = prisma.factoid.delete({
        where: {
            id: factoidId
        }
    })

    try {
        await prisma.$transaction([deleteVotes, deletePost]);

        return new Response('Post deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Failed to delete post:', error);
        return new Response('Failed to delete post', { status: 500 });
    }
}