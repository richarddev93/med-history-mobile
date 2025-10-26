import { cn } from '@/lib/utils';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  className?: string;
};

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  className = '',
}: Props) {
  const base = 'w-full py-3 rounded-md items-center justify-center flex-row';
  const variants = {
    primary: 'bg-primary',
    outline: 'border border-primary bg-transparent',
    danger: 'bg-danger',
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(base, variants, disabled ? 'opacity-50' : '', className)}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          className={cn(
            'text-center font-semibold',
            variant === 'outline' ? 'text-primary' : 'text-white'
          )}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
