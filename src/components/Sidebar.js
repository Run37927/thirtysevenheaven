import { categories } from '@/lib/categories';
import React from 'react'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown, Plus, Shuffle } from 'lucide-react';

const websiteIntro = {
    title: '37 Heaven',
    description: 'A crowdsourced collection for the number 37 enthusiasts.'
};

function Sidebar({ session }) {
    return (
        <div className="mb-4 md:mb-0 md:w-1/3 md:ml-4 md:sticky top-16 space-y-4">
            <div className="bg-white shadow-sm rounded-lg p-4 border border-zinc-100">
                <div className="space-y-2 text-center">
                    <h3 className="text-xl font-semibold">{websiteIntro.title}</h3>
                    <p className="text-sm text-zinc-700">{websiteIntro.description}</p>
                </div>

                <div className="flex flex-col items-center py-6">
                    <p className="font-semibold text-zinc-500">COLLECTIONS</p>
                    <p className="font-semibold text-3xl">47,384</p>
                </div>

                <div className="space-y-2">
                    <Link href={session?.user ? '/submit' : '/sign-in'} className={cn(buttonVariants({
                        size: "sm", variant: "ghost"
                    }), "flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
                        <Plus className='h-4 w-4' />
                        <span>Submit a 37 factoid</span>
                    </Link>

                    <div
                        className={cn(buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        }), "cursor-pointer flex items-center justify-center gap-2 px-4 border border-zinc-200")}>
                        <Shuffle className='h-4 w-4' />
                        <span>I&apos;m feeling lucky</span>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 border border-zinc-100">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Browse categories</p>
                    <ChevronDown className='h-4 w-4' />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((category, index) => (
                        <div key={index} className='my-1 cursor-pointer max-w-32 rounded-lg bg-gray-200 px-2 py-1 hover:opacity-75'>
                            <p className="text-xs text-center font-semibold text-zinc-700">{category.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar