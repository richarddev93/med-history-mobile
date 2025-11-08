import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
  label?: string;
  size?: number;
};

export default function FAB({ onPress, iconName = 'add', label, size = 56 }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <View style={styles.inner}>
        <Ionicons name={iconName} size={24} color="#fff" />
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    zIndex: 50,
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    bottom: -22,
    right: -6,
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'transparent',
  },
});
