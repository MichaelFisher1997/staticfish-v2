import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Category {
  _id: string;
  title: string;
  description?: string;
  postCount: number;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function CategorySidebar({ categories, selectedCategory, onCategorySelect }: CategorySidebarProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onCategorySelect(null)}
        >
          All Posts
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category.title ? "default" : "ghost"}
            className="w-full justify-between"
            onClick={() => onCategorySelect(category.title)}
          >
            <span>{category.title}</span>
            <Badge variant="secondary" className="ml-auto">
              {category.postCount}
            </Badge>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}