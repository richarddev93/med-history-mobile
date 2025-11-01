import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Screen({
  children,
  scroll = false,
  className = '',
}: {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
}) {
  const Wrapper = scroll ? ScrollView : View;

  return (
      <Wrapper
        className={`flex-1 bg-bg ${className}`}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {children}
      </Wrapper>
  );
}
