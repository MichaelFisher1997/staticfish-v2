import { createClient } from '@sanity/client';

// Create a Sanity client instance
export const client = createClient({
  projectId: '2gr3dh6t',
  dataset: 'production',
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
