export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  categories: string[];
  publishedAt: string;
  excerpt: string;
  body: any[];
}
