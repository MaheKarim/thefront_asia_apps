import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import CompactArticleCard from '../../components/CompactArticleCard';
import { articles, categories } from '@/data/articles';
import { Article } from '@/types';

export default function HomeTab() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [articleList, setArticleList] = useState<Article[]>(articles);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleBookmark = (articleId: string) => {
    setArticleList(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const handleArticlePress = (article: Article) => {
    router.push(`/article/${article.id}`);
  };

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const filteredArticles = selectedCategory === 'All' 
    ? articleList 
    : articleList.filter(article => article.category === selectedCategory);

  const [firstArticle, ...restArticles] = filteredArticles;

  const allCategories = ['All', ...categories.map(cat => cat.name)];

  return (
    <View style={styles.container}>
      <Header 
        title="Daily News" 
        showNotification={true}
        onNotificationPress={() => console.log('Notifications pressed')}
      />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          style={styles.categoryScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {allCategories.map((categoryName) => (
            <TouchableOpacity
              key={categoryName}
              style={[
                styles.categoryChip,
                selectedCategory === categoryName && styles.categoryChipActive
              ]}
              onPress={() => handleCategoryPress(categoryName)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === categoryName && styles.categoryChipTextActive
                ]}
              >
                {categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Articles */}
        {firstArticle && (
          <ArticleCard
            article={firstArticle}
            variant="featured"
            onPress={() => handleArticlePress(firstArticle)}
            onBookmarkPress={() => handleBookmark(firstArticle.id)}
          />
        )}
        
        {restArticles.map((article) => (
          <CompactArticleCard
            key={article.id}
            article={article}
            onPress={() => handleArticlePress(article)}
            onBookmarkPress={() => handleBookmark(article.id)}
          />
        ))}
        
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
  categoryScroll: {
    maxHeight: 60,
    marginBottom: 10,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#1F2937',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});