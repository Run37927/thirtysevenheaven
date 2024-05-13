'use client';
import { formatTimeToNow } from '@/lib/utils';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Flag, Heart, Loader2, Share2 } from 'lucide-react';
import React, { useEffect } from 'react'
import Report from './Report';
import { FaHeart } from "react-icons/fa";

function InfiniteCards({ initialCards }) {
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5
    });

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['infinite-query'],
        queryFn: async ({ pageParam = 1 }) => {
            const query = `/api/factoids?limit=${5}&page=${pageParam}`;
            const { data } = await axios.get(query);
            return data;
        },
        getNextPageParam: (_, pages) => {
            return pages.length + 1;
        },
        initialData: { pages: [initialCards], pageParams: [1] }
    })

    const factoidCards = data?.pages.flatMap(page => page) ?? initialCards;
    console.log(factoidCards);

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);

    return (
        <div className="flex flex-col md:w-2/3 space-y-4">
            {factoidCards.map((factoid, index) => {
                if (index === factoidCards.length - 1) {
                    return (
                        <React.Fragment key={factoid.id}>
                            <div ref={ref} className="bg-white shadow-sm rounded-lg px-6 py-8 border border-zinc-100">
                                <p className="font-semibold text-xl">{factoid.description}</p>
                                <p className="mt-6">{factoid.note}</p>
                                <div className="flex items-center space-x-2 text-xs mt-8">
                                    {/* <span className="font-semibold">- {factoid.author.name}</span> */}
                                    <span className="font-semibold">- Tom Magliery</span>
                                    <span>•</span>
                                    <span>{formatTimeToNow(new Date(factoid.createdAt))}</span>
                                </div>

                                <div className='overflow-x-auto'>
                                    <div className="flex gap-3">
                                        {factoid.categories.map(item => {
                                            return (
                                                <div key={item.id} className='cursor-pointer bg-gray-200 hover:opacity-75 rounded-lg mb-2 mt-4 py-1 px-3 inline-block whitespace-nowrap'>
                                                    <p className='text-xs'>{item.name}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div
                                        className="cursor-pointer flex items-center justify-center gap-1">
                                        <FaHeart className='h-5 w-5 text-red-500' />
                                        <p>1</p>
                                    </div>

                                    <div className="flex items-center justify-center gap-5">
                                        <div
                                            className="cursor-pointer flex items-center justify-center gap-1 text-zinc-600 hover:opacity-75">
                                            <Share2 className='h-5 w-5' />
                                            <p>Share</p>
                                        </div>

                                        <Report />
                                    </div>
                                </div>
                            </div>
                            {isFetchingNextPage && (
                                <div className="flex">
                                    <Loader2 className='h=10 w-10 animate-spin text-center mx-auto' />
                                </div>
                            )}
                        </React.Fragment>
                    )
                } else {
                    return (
                        <div key={factoid.id} className="bg-white shadow-sm rounded-lg px-6 py-8 border border-zinc-100">
                            {index === 0 && (
                                <div className="bg-zinc-900 text-white rounded-lg px-2 py-1 text-xs text-center font-bold max-w-32 mb-2">
                                    factoid of the day
                                </div>
                            )}
                            <p className="font-semibold text-xl">{factoid.description}</p>
                            <p className="mt-6">{factoid.note}</p>
                            <div className="flex items-center space-x-2 text-xs mt-8">
                                {/* <span className="font-semibold">- {factoid.author.name}</span> */}
                                <span className="font-semibold">- Tom Magliery</span>
                                <span>•</span>
                                <span>{formatTimeToNow(new Date(factoid.createdAt))}</span>
                            </div>

                            <div className='overflow-x-auto'>
                                <div className="flex gap-3">
                                    {factoid.categories.map(item => {
                                        return (
                                            <div key={item.id} className='cursor-pointer bg-gray-200 hover:opacity-75 rounded-lg mb-2 mt-4 py-1 px-3 inline-block whitespace-nowrap'>
                                                <p className='text-xs'>{item.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div
                                    className="cursor-pointer flex items-center justify-center gap-1">
                                    <Heart className='h-5 w-5 hover:text-red-500' />
                                    <p>1</p>
                                </div>

                                <div className="flex items-center justify-center gap-5">
                                    <div
                                        className="cursor-pointer flex items-center justify-center gap-1 text-zinc-600 hover:opacity-75">
                                        <Share2 className='h-5 w-5' />
                                        <p>Share</p>
                                    </div>

                                    <Report />
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            {!isFetchingNextPage && (
                <div className="text-center py-4">
                    You&apos;ve reached the end😔
                </div>
            )}
        </div>
    )
}

export default InfiniteCards