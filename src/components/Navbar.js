import React from 'react'
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { ArrowRight, Bell } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'
import Image from 'next/image'
import { FaGithub } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

async function Navbar() {
    const session = await getAuthSession();

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all">
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <div className='flex items-center justify-center'>
                        <Link href='/' className='flex z-40 font-semibold text-lg'>
                            <Image src='/tsheaven.png' alt='37heaven logo' width={30} height={30} />
                            <span>Heaven</span>
                        </Link>
                        <Link href={session?.user ? '/submit' : 'sign-in'} className={cn(buttonVariants({ size: "sm", variant: "ghost" }), "ml-2 text-zinc-700")}>Submit</Link>
                    </div>

                    {/* TODO: add mobile navbar */}

                    <div className='hidden items-center space-x-1.5 sm:flex'>
                        <>
                            <div
                                className={cn(buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }), "cursor-pointer")}>
                                <FaBell className='h-4 w-4' />
                            </div>

                            <a href='https://github.com/Run37927/thirtysevenheaven' target='_blank' rel='noopener noreferrer'
                                className={cn(buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }), "cursor-pointer")}>
                                <FaGithub className='h-4 w-4' />
                            </a>

                            {session?.user ? (
                                <UserAccountNav session={session} />
                            ) : (
                                <Link href='/sign-in' className={cn(buttonVariants({ size: "sm" }), "flex items-center justify-center group px-4 bg-zinc-800 hover:bg-zinc-950")}>
                                    <span>Sign in</span>
                                    <ArrowRight className='ml-1.5 transform h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar