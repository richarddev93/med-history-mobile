import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { UIIconName } from '@/types/ui-types';
import { Ionicons } from '@expo/vector-icons';
export type SelectDropDownSimpleProps<T extends string> = {
  label?: string;
  iconName?: UIIconName;
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

export default function SelectDropDownSimple<T extends string>({
  label,
  iconName,
  options,
  value,
  onChange,
}: SelectDropDownSimpleProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <View className=" mb-1 flex-row items-center gap-2">
        {iconName && <Ionicons name={iconName} size={20} color="#8FA3BF" />}
        {label && <Text className="text-md mb-1 text-text">{label}</Text>}
      </View>

      <TouchableOpacity
        onPress={() => setIsOpen((s) => !s)}
        className="rounded-md border border-[#1F2A3C] bg-card px-3 py-3 text-text mb-4">
        <Text className="text-white">{value || 'Select encounter type'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View className="mt-2 overflow-hidden rounded-md border border-[#1F2A3C] bg-card">
          {options.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => {
                onChange(t);
                setIsOpen(false);
              }}
              className="px-3 py-3">
              <Text
                className={`text-sm ${value === t ? 'font-semibold text-blue-400' : 'text-white'}`}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}
