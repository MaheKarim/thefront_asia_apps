import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  Text, 
  TouchableOpacity 
} from 'react-native';
import { Search as SearchIcon, Filter, X } from 'lucide-react-native';
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import { articles, categories } from '@/data/articles';
import { Article } from '@/types';

export default function SearchTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '' && selectedCategories.length === 0) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    
    const filtered = articles.filter(article => {
      const matchesQuery = query.trim() === '' || 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.author.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(article.category);
      
      return matchesQuery && matchesCategory;
    });

    setSearchResults(filtered);
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(categoryName) 
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName];
      
      // Re-run search with updated categories
      setTimeout(() => handleSearch(searchQuery), 0);
      
      return updated;
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    handleSearch(searchQuery);
  };

  const handleBookmark = (articleId: string) => {
    setSearchResults(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const handleArticlePress = (article: Article) => {
    console.log('Article pressed:', article.title);
  };

  return (
    <View style={styles.container}>
      <Header title="Search" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles, authors..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        style={styles.categoriesScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategories.includes(category.name) && {
                backgroundColor: category.color,
                borderColor: category.color,
              }
            ]}
            onPress={() => toggleCategory(category.name)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategories.includes(category.name) && styles.categoryChipTextActive
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
        
        {selectedCategories.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {!isSearchActive ? (
          <View style={styles.emptyState}>
            <SearchIcon size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Search News</Text>
            <Text style={styles.emptyMessage}>
              Find articles by title, content, or author
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {searchResults.length} results found
              </Text>
            </View>
            
            {searchResults.map((article) => (
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoriesScroll: {
    maxHeight: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  clearButton: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  resultsCount: {
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