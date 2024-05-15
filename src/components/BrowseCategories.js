'use client'
import React, { useContext } from 'react'
import { categories } from '@/lib/categories';
import { CategoryContext } from '@/lib/CategoryContext';
import { useRouter } from 'next/navigation';

function BrowseCategories() {
    const { setSelectedCategory } = useContext(CategoryContext);
    const router = useRouter();

    return (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-zinc-200">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Browse categories</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className='my-1 cursor-pointer max-w-32 rounded-lg bg-gray-200 px-2 py-1 hover:opacity-75'
                        onClick={() => {
                            setSelectedCategory(category.value);
                            router.push(`/browse/${category.value}`);
                        }}
                    >
                        <p className="text-xs text-center font-semibold text-zinc-700">{category.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowseCategories