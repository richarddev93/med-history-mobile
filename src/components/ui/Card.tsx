import React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: Props) {
  return (
    <View className={cn('bg-card rounded-md p-4 mb-3 border border-[#1F2A3C]', className)}>
      {children}
    </View>
  );
}
