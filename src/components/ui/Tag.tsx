import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  className?: string;
};

export default function Tag({ label, variant = 'default', className = '' }: Props) {
  const colors = {
    default: 'bg-[#1F2A3C] text-muted',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    warning: 'bg-yellow-600/10 text-yellow-400',
  }[variant];

  return (
    <View className={cn('px-2 py-1 rounded-full', colors, className)}>
      <Text className="text-xs font-semibold">{label}</Text>
    </View>
  );
}
