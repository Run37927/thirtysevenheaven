'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react'
import FactoidCard from './FactoidCard';

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
                        <div key={factoid.id} ref={ref}>
                            <FactoidCard factoid={factoid} />
                            {isFetchingNextPage && (
                                <div className="flex">
                                    <Loader2 className='h-6 w-6 animate-spin text-center mx-auto mt-2' />
                                </div>
                            )}
                        </div>
                    )
                } else {
                    return (
                        <div key={factoid.id}>
                            <FactoidCard factoid={factoid} />
                        </div>
                    )
                }
            })}
            {
                !isFetchingNextPage && (
                    <div className="text-center py-4">
                        You&apos;ve reached the end😔
                    </div>
                )
            }
        </div >
    )
}

export default InfiniteCards