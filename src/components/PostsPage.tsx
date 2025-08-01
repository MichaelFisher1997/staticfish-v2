import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { PostSearch } from './PostSearch';
import { CategorySidebar } from './CategorySidebar';
import HeroCarousel from './HeroCarousel';
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

const heroImages = [
  "/hero-1.png",
  "/hero-2.png", 
  "/hero-3.png",
  "/hero-4.png",
  "/hero-5.png",
];

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
    <>
      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center text-center overflow-hidden mb-16">
        <div className="absolute inset-0 w-full h-full">
          <HeroCarousel images={heroImages} />
          <div className="absolute inset-0 bg-black opacity-60 z-20"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-blue-50/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-200 ring-1 ring-inset ring-blue-300/20 mb-6">
              <span>Latest Articles</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Insights & Stories
            </h1>
            
            {/* Subheading */}
            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
              Discover the latest trends, insights, and stories from our team. From technical deep-dives to industry perspectives.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="max-w-lg mx-auto">
            <PostSearch 
              onSearch={handleSearch} 
              onClear={handleClearSearch}
              placeholder="Search articles, topics, or keywords..."
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
                <a 
                  key={post._id} 
                  href={`/posts/${post.slug.current}`}
                  className="group block"
                >
                  <Card className="flex flex-col overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border-border bg-card h-full group-hover:scale-[1.02] group-hover:border-blue-200 dark:group-hover:border-blue-800">
                    {post.mainImage && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <img 
                          src={getImageUrl(post.mainImage)} 
                          alt={post.title} 
                          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
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
                                className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 font-medium text-xs cursor-pointer hover:bg-muted/80 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleCategorySelect(category);
                                }}
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-3 mt-2">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <div className="flex mt-4 items-center justify-between">
                        <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          <span className="text-sm font-medium">Read more</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        {post.author && (
                          <div className="text-sm text-muted-foreground">
                            By {post.author}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </a>
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
    </>
  );
}