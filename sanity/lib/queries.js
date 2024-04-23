// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]{
    title,
    slug,
    mainImage{
       asset->{
         url,
         metadata{
           lqip // Low-Quality Image Placeholder
         }
       }
    },
    author->{
       name
    },
    publishedAt
   }`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;