import { createClient } from '@sanity/client';

// Create a Sanity client instance
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.SANITY_DATASET;

if (!projectId || !dataset) {
  // This will now only fail if neither the public-prefixed nor the non-prefixed variables are found.
  throw new Error('Missing Sanity project ID or dataset from environment variables.');
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

// Function to fetch all categories
export async function getAllCategories() {
  return await client.fetch(`*[_type == "category"]{
    _id,
    title,
    description,
    "postCount": count(*[_type == "post" && references(^._id)])
  } | order(title asc)`);
}

// Function to search posts
export async function searchPosts(searchTerm: string) {
  return await client.fetch(`*[_type == "post" && (title match $searchTerm || excerpt match $searchTerm)]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  } | order(publishedAt desc)`, { searchTerm: `*${searchTerm}*` });
}

// Function to fetch posts by category
export async function getPostsByCategory(categoryTitle: string) {
  return await client.fetch(`*[_type == "post" && references(*[_type == "category" && title == $categoryTitle]._id)]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  } | order(publishedAt desc)`, { categoryTitle });
}
