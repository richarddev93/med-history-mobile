import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface HeaderProps {
  title: string;
  details?: string;
  onHandleBack?: () => void;
  onHandle?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  textButton?: string;
}
export const Header = ({
  title,
  details,
  onHandleBack,
  onHandle,
  iconName = 'information-circle-outline',
  iconColor = 'white',
  textButton,
}: HeaderProps) => {
  return (
    <View className="flex h-32 flex-row items-center justify-between  bg-secondary px-2">
      {onHandleBack && (
        <TouchableHighlight
          className="flex  h-16 w-16 items-center justify-center"
          onPress={() => {
            onHandleBack();
          }}>
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableHighlight>
      )}
      <View className="flex-1 text-text">
        <Text className=" text-2xl font-extrabold text-text">{title}</Text>
        <Text className="text-text">{details}</Text>
      </View>
      {onHandle && (
        <TouchableHighlight
          className="flex  h-16 w-16 items-center justify-center"
          onPress={() => {
            onHandle();
          }}>
          <Ionicons name={iconName} size={20} color={iconColor} />
          {/* {textButton && <Text className="text-text">{textButton}</Text>} */}
        </TouchableHighlight>
      )}
    </View>
  );
};
