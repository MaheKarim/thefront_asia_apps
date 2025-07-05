import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Eye } from 'lucide-react-native';
import { Article } from '@/types';

interface CompactArticleCardProps {
  article: Article;
  onPress: () => void;
  onBookmarkPress: () => void;
}

export default function CompactArticleCard({ 
  article, 
  onPress, 
  onBookmarkPress 
}: CompactArticleCardProps) {
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
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '1h ago';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        
        <Text style={styles.excerpt} numberOfLines={2}>
          {article.excerpt}
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
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 20,
    marginBottom: 6,
  },
  excerpt: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  separator: {
    fontSize: 12,
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
  },
});