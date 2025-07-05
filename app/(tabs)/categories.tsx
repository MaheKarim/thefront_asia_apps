import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Zap, 
  Building2, 
  Trophy, 
  Smartphone, 
  TrendingUp, 
  Heart, 
  Microscope, 
  Film 
} from 'lucide-react-native';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/articles';

const iconMap: { [key: string]: any } = {
  'zap': Zap,
  'building-2': Building2,
  'trophy': Trophy,
  'smartphone': Smartphone,
  'trending-up': TrendingUp,
  'heart': Heart,
  'microscope': Microscope,
  'film': Film,
};

export default function CategoriesTab() {
  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    console.log(`Navigate to ${categoryName} articles`);
    // Implement navigation to category articles
  };

  return (
    <View style={styles.container}>
      <Header title="Categories" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <CategoryCard
                key={category.id}
                category={category}
                Icon={IconComponent}
                onPress={() => handleCategoryPress(category.id, category.name)}
              />
            );
          })}
        </View>
        
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
  categoriesContainer: {
    paddingTop: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});