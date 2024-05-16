import React from 'react'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus, Shuffle } from 'lucide-react';
import Disclamier from './Disclamier';
import BrowseCategories from './BrowseCategories';
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const websiteIntro = {
    title: '37 Heaven',
    description: 'A crowdsourced collection for the number 37 enthusiasts.'
};

function Sidebar({ session, factoidCount }) {
    return (
        <div className="mb-4 md:mb-0 md:w-1/3 md:ml-4 md:sticky top-16 space-y-4">
            <div className="bg-white shadow-sm rounded-lg p-4 border border-zinc-200">
                <div className="space-y-2 text-center">
                    <h3 className="text-xl font-semibold">{websiteIntro.title}</h3>
                    <p className="text-sm text-zinc-700 px-6">{websiteIntro.description}</p>
                </div>

                <div className='w-full h-px bg-zinc-200 mt-4' />

                <div className="flex flex-col items-center py-4">
                    <p className="font-semibold text-zinc-500">COLLECTIONS</p>
                    <p className="font-semibold text-3xl">{factoidCount}</p>
                </div>

                <div className="space-y-2">
                    <Link href={session?.user ? '/submit' : '/sign-in'} className={cn(buttonVariants({
                        size: "sm", variant: "default"
                    }), "flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
                        <Plus className='h-4 w-4' />
                        <span>Submit a 37 factoid</span>
                    </Link>

                    <Link
                        href='https://discord.com/invite/d6jK3Sr3ng'
                        className={cn(buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        }), "cursor-pointer flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
                        <FaDiscord className='h-4 w-4' />
                        <span>Join Server</span>
                    </Link>

                    <Link
                        href='https://twitter.com/hairunhuang'
                        target="_blank" rel="noopener noreferrer"
                        className={cn(buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        }), "cursor-pointer flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
                        <FaXTwitter className='h-4 w-4' />
                        <span>Made by Run</span>
                    </Link>
                </div>
            </div>

            <BrowseCategories />
            <Disclamier />
        </div>
    )
}

export default Sidebar