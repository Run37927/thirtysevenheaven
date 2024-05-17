import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

function loading() {
    return (
        <MaxWidthWrapper>
            <div className="container mx-auto py-6">
                <div className="space-y-4">
                    <div>
                        <Skeleton className="h-4 w-1/4 mb-1" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-1/4 mb-1" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-1/4 mb-1" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default loading