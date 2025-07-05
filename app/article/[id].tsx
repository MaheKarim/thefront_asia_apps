import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity,
  Share,
  Platform 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Clock,
  User,
  Calendar
} from 'lucide-react-native';
import { articles } from '@/data/articles';
import { Article } from '@/types';
import CompactArticleCard from '@/components/CompactArticleCard';

export default function ArticleDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const article = articles.find(a => a.id === id);
  
  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 4);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web fallback
        if (navigator.share) {
          await navigator.share({
            title: article.title,
            text: article.excerpt,
            url: window.location.href,
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          await navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
      } else {
        await Share.share({
          message: `${article.title}\n\n${article.excerpt}`,
          title: article.title,
        });
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleRelatedArticlePress = (relatedArticle: Article) => {
    router.push(`/article/${relatedArticle.id}`);
  };

  const handleRelatedBookmark = (articleId: string) => {
    console.log('Bookmark related article:', articleId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share2 size={22} color="#111827" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton} onPress={handleBookmark}>
            {isBookmarked ? (
              <BookmarkCheck size={22} color="#DC2626" />
            ) : (
              <Bookmark size={22} color="#111827" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Breaking News Badge */}
        {article.isBreaking && (
          <View style={styles.breakingContainer}>
            <View style={styles.breakingBadge}>
              <Text style={styles.breakingText}>BREAKING NEWS</Text>
            </View>
          </View>
        )}

        {/* Category */}
        <View style={styles.categoryContainer}>
          <Text style={[styles.category, { color: getCategoryColor(article.category) }]}>
            {article.category.toUpperCase()}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Meta Information - Single Line */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <User size={14} color="#6B7280" />
            <Text style={styles.metaText}>{article.author}</Text>
            
            <Text style={styles.metaSeparator}>•</Text>
            
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.metaText}>{formatDate(article.publishedAt)}</Text>
            
            <Text style={styles.metaSeparator}>•</Text>
            
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{article.readTime} min read</Text>
          </View>
        </View>

        {/* Featured Image */}
        <Image source={{ uri: article.imageUrl }} style={styles.featuredImage} />

        {/* Excerpt */}
        <Text style={styles.excerpt}>{article.excerpt}</Text>

        {/* Content */}
        <View style={styles.contentContainer}>
          {article.content.split('\n\n').map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>Related Articles</Text>
            <Text style={styles.relatedSubtitle}>
              More stories from {article.category}
            </Text>
            
            {relatedArticles.map((relatedArticle) => (
              <CompactArticleCard
                key={relatedArticle.id}
                article={relatedArticle}
                onPress={() => handleRelatedArticlePress(relatedArticle)}
                onBookmarkPress={() => handleRelatedBookmark(relatedArticle.id)}
              />
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollView: {
    flex: 1,
  },
  breakingContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  breakingBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  breakingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 36,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  metaContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  metaSeparator: {
    fontSize: 13,
    color: '#D1D5DB',
    marginHorizontal: 12,
    fontWeight: '500',
  },
  featuredImage: {
    width: '100%',
    height: 240,
    marginBottom: 20,
  },
  excerpt: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 26,
    paddingHorizontal: 20,
    marginBottom: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  relatedSection: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  relatedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  relatedSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 40,
  },
});