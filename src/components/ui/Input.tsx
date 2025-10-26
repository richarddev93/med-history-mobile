import React from 'react';
import { TextInput, Text, View } from 'react-native';

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  className?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
};

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  className = '',
}: Props) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && <Text className="text-text mb-1 text-sm">{label}</Text>}
      <TextInput
        className="bg-card text-text px-3 py-3 rounded-md border border-[#1F2A3C]"
        placeholder={placeholder}
        placeholderTextColor="#8FA3BF"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}
