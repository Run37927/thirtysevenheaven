'use client'
import React, { useContext, useEffect } from 'react'
import { categories } from '@/lib/categories';
import { CategoryContext } from '@/lib/CategoryContext';
import { usePathname, useRouter } from 'next/navigation';
import progress from './ui/progressBar';

function BrowseCategories() {
    const { setSelectedCategory } = useContext(CategoryContext);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Start the progress bar just before navigation starts
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
    }, [pathname]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        router.push(`/browse/${category}`);
    };

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
                        onClick={() => handleCategoryClick(category.value)}
                    >
                        <p className="text-xs text-center font-semibold text-zinc-700">{category.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowseCategories