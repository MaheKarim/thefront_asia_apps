import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
  onBookmarkPress: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ArticleCard({ 
  article, 
  onPress, 
  onBookmarkPress,
  variant = 'default' 
}: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Politics': '#DC2626',
      'Sports': '#059669',
      'Technology': '#7C3AED',
      'Business': '#EA580C',
      'Health': '#DC2626',
      'Science': '#0891B2',
      'Entertainment': '#BE185D',
      'Fashion': '#EC4899',
      'Breaking News': '#DC2626',
    };
    return colors[category] || '#6B7280';
  };

  const formatTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const cardStyle = variant === 'featured' ? styles.featuredCard : 
                   variant === 'compact' ? styles.compactCard : styles.defaultCard;

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.timeAgo}>
            {formatTimeAgo(article.publishedAt)}
          </Text>
          <Text style={styles.separator}>|</Text>
          <Text style={[styles.category, { color: getCategoryColor(article.category) }]}>
            {article.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  compactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 26,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAgo: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  separator: {
    fontSize: 14,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
  },
});