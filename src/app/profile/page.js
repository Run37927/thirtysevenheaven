import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
    const session = await getAuthSession();

    if (session === null) {
        redirect('/sign-in');
    }

    const factoidCount = await prisma.factoid.count({
        where: {
            authorId: session.user.id
        }
    });

    return (
        <MaxWidthWrapper className='mt-8'>
            <div className='flex flex-col sm:flex-row sm:justify-between bg-white shadow-sm rounded-lg px-6 py-8 border border-zinc-200'>
                <div className='flex items-start gap-8'>
                    <div className='h-18 w-18'>
                        <Image width={100} height={100} src={session.user?.image} alt="profile pic" className='rounded-xl object-contain' />
                    </div>

                    <div>
                        <h1 className='text-2xl font-bold'>{session.user.name}</h1>
                        <p className='text-gray-500 mb-2'>{session.user.email}</p>
                        <p className='text-sm font-semibold rounded-md py-1 mt-1 text-green-800 bg-green-500 bg-opacity-20 max-w-12 text-center'>User</p>
                    </div>
                </div>

                <div className='mt-8 sm:mt-0'>
                    <div className='flex flex-row items-center sm:items-stretch gap-2 sm:gap-0 sm:flex-col text-xl font-semibold sm:space-y-5'>
                        <p>Total factoids submitted:</p>
                        <span className='sm:block text-center py-1 sm:py-2 px-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white rounded-md'>
                            {factoidCount}
                        </span>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default page