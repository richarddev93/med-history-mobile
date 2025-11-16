import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button } from '@/components/ui';

export function PrescriptionFormModal({
  onClose,
  onSave,
  initialValue,
}: {
  onClose: () => void;
  onSave: (item: any) => void;
  initialValue?: any;
}) {
  const [medication, setMedication] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [observations, setObservations] = useState('');

  useEffect(() => {
    if (initialValue) {
      setMedication(initialValue.medication || '');
      setDose(initialValue.dose || '');
      setFrequency(initialValue.frequency || '');
      setDuration(initialValue.duration || '');
      setObservations(initialValue.observations || '');
    }
  }, [initialValue]);

  

  const handleSubmit = () => {
    if (!medication.trim()) return;

    onSave({
      medication,
      dose,
      frequency,
      duration,
      observations,
    });
  };

  return (
    <Modal animationType="slide" transparent visible>
      <View className="flex-1 justify-end bg-black/50">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View className="bg-[#1C1F26] p-6 rounded-t-2xl border-t border-[#2A3340]">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl text-white font-semibold">
                {initialValue ? 'Edit Medication' : 'Add Medication'}
              </Text>

              <TouchableOpacity onPress={onClose}>
                <Text className="text-red-400 text-lg">Close</Text>
              </TouchableOpacity>
            </View>

            {/* Inputs */}
            <Input
              label="Medication"
              iconName="medkit"
              value={medication}
              onChangeText={setMedication}
              placeholder="E.g., Dipyrone"
            />

            <Input
              label="Dose"
              iconName="flask"
              value={dose}
              onChangeText={setDose}
              placeholder="E.g., 500mg"
            />

            <Input
              label="Frequency"
              iconName="time"
              value={frequency}
              onChangeText={setFrequency}
              placeholder="E.g., 1 tablet every 8 hours"
            />

            <Input
              label="Duration"
              iconName="calendar"
              value={duration}
              onChangeText={setDuration}
              placeholder="E.g., 3 days"
            />

            <Input
              label="Observations"
              iconName="document-text"
              value={observations}
              onChangeText={setObservations}
              placeholder="Optional"
              multiline
            />

            {/* Buttons */}
            <Button
              title={initialValue ? 'Save changes' : 'Add'}
              onPress={handleSubmit}
              className="mt-4"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
