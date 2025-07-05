import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { BookmarkX } from 'lucide-react-native';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { Article } from '@/types';

export default function BookmarksTab() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>(
    articles.filter(article => article.isBookmarked || Math.random() > 0.7)
      .map(article => ({ ...article, isBookmarked: true }))
  );

  const handleBookmark = (articleId: string) => {
    setBookmarkedArticles(prevArticles =>
      prevArticles.filter(article => article.id !== articleId)
    );
  };

  const handleArticlePress = (article: Article) => {
    console.log('Article pressed:', article.title);
  };

  return (
    <View style={styles.container}>
      <Header title="Bookmarks" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {bookmarkedArticles.length === 0 ? (
          <View style={styles.emptyState}>
            <BookmarkX size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
            <Text style={styles.emptyMessage}>
              Save articles you want to read later by tapping the bookmark icon
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.subtitle}>
                {bookmarkedArticles.length} saved articles
              </Text>
            </View>
            
            {bookmarkedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="compact"
                onPress={() => handleArticlePress(article)}
                onBookmarkPress={() => handleBookmark(article.id)}
              />
            ))}
          </>
        )}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});