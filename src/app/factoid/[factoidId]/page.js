import FactoidCard from '@/components/FactoidCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Sidebar from '@/components/Sidebar';
import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({ params }) {
    const factoidId = params.factoidId;
    const session = await getAuthSession();

    const factoid = await prisma.factoid.findUnique({
        where: {
            id: factoidId
        },
        include: {
            author: {
                select: {
                    name: true,
                    username: true,
                },
            },
            categories: true,
            votes: true,
        },
    });

    const factoidCount = await prisma.factoid.count();

    console.log("found factoid: ", factoid);
    if (!factoid) return notFound();

    return (
        <MaxWidthWrapper className="mb-12 mt-8 flex flex-col md:flex-row-reverse md:items-start md:justify-center">
            <Sidebar session={session} factoidCount={factoidCount} className="order-1 md:order-2" />
            <FactoidCard factoid={factoid} />
        </MaxWidthWrapper>
    )
}

export default page