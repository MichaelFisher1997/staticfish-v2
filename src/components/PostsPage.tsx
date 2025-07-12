import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PostSearch } from './PostSearch';
import { CategorySidebar } from './CategorySidebar';
import type { Post } from '../types/post';

interface Category {
  _id: string;
  title: string;
  description?: string;
  postCount: number;
}

interface PostsPageProps {
  initialPosts: Post[];
  categories: Category[];
}

export function PostsPage({ initialPosts, categories }: PostsPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter posts by category and search term
  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => 
        post.categories?.includes(selectedCategory)
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt?.toLowerCase().includes(term)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm]);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    
    try {
      // In a real implementation, you might want to call the server-side search
      // For now, we'll use client-side filtering
      setIsLoading(false);
    } catch (error) {
      console.error('Search failed:', error);
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const getImageUrl = (image: any) => {
    if (!image?.asset?._ref) return '';
    return image.asset._ref
      .replace('image-', 'https://cdn.sanity.io/images/2gr3dh6t/production/')
      .replace('-jpg', '.jpg')
      .replace('-png', '.png')
      .replace('-webp', '.webp');
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
          Our Blog
        </h1>
        <p className="mt-2 text-lg leading-8 text-muted-foreground mb-8">
          Latest insights, news, and updates from Staticfish.
        </p>
        
        {/* Search */}
        <div className="max-w-md mx-auto">
          <PostSearch 
            onSearch={handleSearch} 
            onClear={handleClearSearch}
            placeholder="Search posts..."
          />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Category Filter */}
          <div className="lg:hidden mb-6">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Results Info */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </span>
              ) : (
                <>
                  Showing {filteredPosts.length} of {posts.length} posts
                  {selectedCategory && ` in "${selectedCategory}"`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </>
              )}
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post: Post) => (
                <Card key={post._id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-border bg-card h-full">
                  {post.mainImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={getImageUrl(post.mainImage)} 
                        alt={post.title} 
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between gap-x-4 text-xs mb-2">
                      <time dateTime={post.publishedAt} className="text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-x-2 flex-wrap">
                          {post.categories.map((category, index) => (
                            <span 
                              key={index}
                              className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 font-medium text-xs cursor-pointer hover:bg-muted/80"
                              onClick={() => handleCategorySelect(category)}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <div className="flex mt-4 items-center">
                      <Button variant="link" className="flex items-center p-0">
                        <a href={`/posts/${post.slug.current}`} className="flex items-center">
                          Read post
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      {post.author && (
                        <div className="ml-auto text-sm text-muted-foreground">
                          By {post.author}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {searchTerm || selectedCategory ? 
                    'No posts found matching your criteria. Try adjusting your search or category filter.' :
                    'No posts found. Check back soon for new content!'
                  }
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}