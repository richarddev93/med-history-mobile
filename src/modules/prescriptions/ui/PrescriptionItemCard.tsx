import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type PrescriptionItemCardProps = {
  item: {
    name: string;
    doseValue?: number;
    doseUnit?: string;
    frequencyEvery?: number;
    frequencyUnit?: string;
    durationDays?: number;
    instructions?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
};

export function PrescriptionItemCard({ item, onEdit, onDelete }: PrescriptionItemCardProps) {
  return (
    <View className="mt-2 rounded-md border border-[#2A3340] bg-[#1C1F26] p-3">
      {/* Nome + dose */}
      <Text className="font-bold text-text text-base">
        {item.name}{' '}
        {item.doseValue ? `${item.doseValue}` : ''}
        {item.doseUnit ? ` ${item.doseUnit}` : ''}
      </Text>

      {/* Frequência */}
      {(item.frequencyEvery || item.frequencyUnit) && (
        <Text className="text-gray-400 mt-1">
          {item.frequencyEvery ? item.frequencyEvery : ''}{' '}
          {item.frequencyUnit ? ` / ${item.frequencyUnit}` : ''}
        </Text>
      )}

      {/* Duração */}
      {item.durationDays && (
        <Text className="text-gray-400 mt-1">{item.durationDays} days</Text>
      )}

      {/* Instructions */}
      {item.instructions && (
        <Text className="text-gray-400 mt-1 italic">{item.instructions}</Text>
      )}

      {/* Ações */}
      <View className="mt-3 flex-row gap-6">
        <TouchableOpacity onPress={onEdit} className="flex-row items-center gap-1">
          <Ionicons name="pencil" size={18} color="#60A5FA" />
          <Text className="text-blue-400">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} className="flex-row items-center gap-1">
          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
          <Text className="text-red-400">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
