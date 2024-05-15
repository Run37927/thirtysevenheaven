import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react'
import { getAuthSession } from "@/lib/auth";
import Sidebar from '@/components/Sidebar';
import FilteredCards from '@/components/FilteredCards';

async function page({ params }) {
    const session = await getAuthSession();

    const category = params.category;

    const filteredFactoids = await prisma.factoid.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            categories: {
                some: {
                    name: category
                }
            }
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
    })

    const factoidCount = await prisma.factoid.count();

    if (!filteredFactoids.length) return notFound();

    return (
        <MaxWidthWrapper className="mb-12 mt-8 flex flex-col md:flex-row-reverse md:items-start md:justify-center">
            <Sidebar session={session} factoidCount={factoidCount} className="order-1 md:order-2" />
            <FilteredCards filteredFactoids={filteredFactoids} />
        </MaxWidthWrapper>
    )
}

export default page