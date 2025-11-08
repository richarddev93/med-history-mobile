import React from 'react';
import { View, Text, Image } from 'react-native';

type Props = {
  name?: string;
  uri?: string | null;
  size?: number;
  className?: string;
};

function initialsFromName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export default function Avatar({ name, uri, size = 48 }: Props) {
  const initials = initialsFromName(name);
  const dimension = size;
  if (uri) {
    return <Image source={{ uri }} style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }} />;
  }

  return (
    <View style={{ width: dimension, height: dimension, borderRadius: dimension / 2, backgroundColor: '#1F2A3C', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}
