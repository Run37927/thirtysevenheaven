'use client';
import React, { useEffect, useState } from 'react'
import Report from './Report'
import { formatTimeToNow } from '@/lib/utils';
import { FaHeart } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import Share from './Share';
import progress from './ui/progressBar';

function FactoidCard({ factoid }) {
    const [likeCount, setLikeCount] = useState(factoid.votes?.length ?? 0);
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith('/factoid')) {
            const handleStart = () => {
                progress.start();
            };

            // Stop the progress bar after a slight delay when the pathname changes
            const handleComplete = () => {
                setTimeout(() => {
                    progress.finish();
                }, 100);  // 100 ms delay to ensure all elements are loaded
            };

            handleStart();
            return () => {
                handleComplete();
            };
        }
    }, [pathname]);


    const { mutate: upVote } = useMutation({
        mutationFn: async () => {
            const payload = { factoidId: factoid.id };
            await axios.patch('/api/factoids/vote', payload);
        },
        onError: (error) => {
            console.log("voting error: ", error.response?.data);
            toast({
                variant: "default",
                title: error.response.data ?? "Please try again later."
            });
            setLikeCount(prev => prev - 1);
        },
        onMutate: () => {
            setLikeCount(prev => prev + 1);
        }
    });

    const { mutate: deletePost } = useMutation({
        mutationFn: async () => {
            const payload = { factoidId: factoid.id };
            await axios.delete('/api/factoids/delete', { data: payload });
        },
        onError: (error) => {
            console.log("deleting error: ", error.response?.data);
            toast({
                variant: "destructive",
                title: error.response.data ?? "Please try again later."
            });
        },
        onSuccess: () => {
            router.refresh();
            toast({
                variant: "success",
                title: "Post deleted successfully."
            });
        }
    });

    return (
        <div className={`${pathname.includes('factoid') ? 'md:w-2/3' : ''} bg-white shadow-sm rounded-lg px-6 py-8 border border-zinc-200`}>
            <p
                onClick={() => {
                    router.push(`/factoid/${factoid.id}`)
                }}
                className={`font-semibold text-2xl ${!pathname.includes('factoid') ? 'hover:underline hover:underline-offset-2 hover:cursor-pointer' : ''}`}
            >
                {factoid.description}
            </p>
            <p className="mt-6">{factoid.note}</p>
            <div className="flex items-center space-x-2 text-xs mt-6">
                <span className="font-semibold">- {factoid.author.username || factoid.author.name}</span>
                <span>•</span>
                <span>{formatTimeToNow(new Date(factoid.createdAt))}</span>
            </div>

            <div className='overflow-x-auto'>
                <div className="flex gap-3">
                    {factoid.categories.map(item => {
                        return (
                            <div key={item.id} className='bg-gray-200 rounded-lg mb-2 mt-4 py-1 px-3 inline-block whitespace-nowrap'>
                                <p className='text-xs'>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between mt-2">
                <div
                    className="cursor-pointer flex items-center justify-center gap-2">
                    <FaHeart
                        onClick={upVote}
                        className='h-5 w-5 text-red-500 hover:scale-125 hover:rotate-6 transition-transform duration-200'
                    />
                    <p className='text-lg'>{likeCount}</p>
                    {/* <FaTrashAlt onClick={deletePost} className='h-4 w-4 text-red-600 hover:opacity-75' /> */}
                </div>

                <div className="flex items-center justify-center gap-5">
                    <Share factoidId={factoid.id} />
                    <Report factoidId={factoid.id} />
                </div>
            </div>
        </div>
    )
}

export default FactoidCard