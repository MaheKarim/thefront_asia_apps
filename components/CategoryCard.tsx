import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  Icon: LucideIcon;
}

export default function CategoryCard({ category, onPress, Icon }: CategoryCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { borderLeftColor: category.color }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
        <Icon size={24} color={category.color} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.articleCount}>
          {category.articleCount} articles
        </Text>
      </View>
      
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  articleCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  arrow: {
    paddingLeft: 12,
  },
  arrowText: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});