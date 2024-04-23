import Blog from '@/components/Blog';
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { sanityFetch } from '../../../sanity/lib/fetch';
import { POSTS_QUERY } from '../../../sanity/lib/queries';

async function page() {
    const posts = await sanityFetch({
        query: POSTS_QUERY,
    });
    return (
        <MaxWidthWrapper>
            <Blog posts={posts} />
        </MaxWidthWrapper>
    )
}

export default page