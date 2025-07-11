import { createClient } from '@sanity/client';

// Create a Sanity client instance
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error('Missing SANITY_PROJECT_ID or SANITY_DATASET from environment variables. Please check your .env file.');
}

export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use a UTC date string
});

// Function to fetch all posts
export async function getAllPosts() {
  return await client.fetch(`*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  } | order(publishedAt desc)`);
}

// Function to fetch a single post by slug
export async function getPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }`,
    { slug }
  );
}
