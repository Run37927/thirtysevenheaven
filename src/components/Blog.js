// ./components/Posts.tsx

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export default function Blog({ posts }) {
    console.log(posts)
    return (
        <main className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id}>
                        <Link href={`/blog/${post.slug.current}`}>
                            <Image
                                src={post.mainImage.asset.url}
                                alt={post.mainImage.asset.metadata.lqip}
                                width={500}
                                height={300}
                                className="w-full shadow-sm rounded-xl border border-zinc-100"
                            />
                            <div className="pt-4">
                                <p className="text-gray-500 text-sm">
                                    {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <div className="font-bold text-xl mb-2">{post.title}</div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 mr-2"></div>
                                    <p className="text-gray-700 text-base">
                                        {post.author && `by ${post.author.name}`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="p-4 text-red-500">No posts found</div>
            )}
        </main>
    );
}