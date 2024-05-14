import React from 'react'
import Report from './Report'
import { formatTimeToNow } from '@/lib/utils';
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

function FactoidCard({ factoid }) {
    return (
        <div className="bg-white shadow-sm rounded-lg px-6 py-8 border border-zinc-200">
            <p className="font-semibold text-xl">{factoid.description}</p>
            <p className="mt-6">{factoid.note}</p>
            <div className="flex items-center space-x-2 text-xs mt-8">
                <span className="font-semibold">- {factoid.author.username || factoid.author.name}</span>
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
                    <FaHeart className='h-5 w-5 text-red-500 hover:scale-125 hover:rotate-6 transition-transform duration-200' />
                    <p>1</p>
                </div>

                <div className="flex items-center justify-center gap-5">
                    <div
                        className="cursor-pointer flex items-center justify-center gap-1 text-zinc-600/75 hover:text-zinc-700">
                        <FaShare className='h-4 w-4' />
                        <p>Share</p>
                    </div>

                    <Report />
                </div>
            </div>
        </div>
    )
}

export default FactoidCard