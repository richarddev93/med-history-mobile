import React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  className?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  editable?: boolean;
  multiline?: boolean;
};

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  iconName,
  className = '',
  editable = true,
  multiline = false,
}: Props) {
  return (
    <View className={`mb-4 ${className}`}>
      <View className=" flex-row items-center mb-1 gap-2">
        {iconName && <Ionicons name={iconName} size={20} color="#8FA3BF" />}
        {label && <Text className="mb-1 text-md text-text">{label}</Text>}
      </View>
      <TextInput
        className={`rounded-md border border-[#1F2A3C] bg-card px-3 py-3 text-text ${multiline ? 'min-h-32 text-top' : ''}`}
        placeholder={placeholder}
        placeholderTextColor="#8FA3BF"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={editable ? onChangeText : undefined}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}
