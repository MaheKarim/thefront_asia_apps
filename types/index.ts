export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  isBookmarked?: boolean;
  isFeatured?: boolean;
  isBreaking?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  articleCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    categories: string[];
  };
}