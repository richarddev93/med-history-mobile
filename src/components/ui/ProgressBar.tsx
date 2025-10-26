import React from 'react';
import { View } from 'react-native';

type Props = { value: number; color?: string };

export default function ProgressBar({ value, color = '#2F80ED' }: Props) {
  return (
    <View className="w-full h-3 bg-[#1F2A3C] rounded-full overflow-hidden mt-2 mb-1">
      <View
        style={{ width: `${value}%`, backgroundColor: color }}
        className="h-full rounded-full"
      />
    </View>
  );
}
