import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, Menu } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showNotification?: boolean;
  showMenu?: boolean;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

export default function Header({ 
  title, 
  showNotification = false, 
  showMenu = false,
  onNotificationPress,
  onMenuPress 
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showMenu && (
          <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
            <Menu size={24} color="#374151" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {showNotification && (
        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
          <Bell size={24} color="#374151" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#DC2626',
    marginLeft: 10,
  },
  iconButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
  },
});