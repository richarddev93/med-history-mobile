import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button } from '@/components/ui';
import SelectDropDownSimple from '@/components/ui/SelectDropDownSimple';

const DOSE_UNITS = ["MG", "G", "MCG", "ML", "DROP", "PILL", "TABLET", "CAPSULE", "OTHER"];
const FREQUENCY_UNITS = ["HOUR", "DAY", "WEEK", "MONTH", "PRN"];
const ROUTES = ["ORAL", "TOPICAL", "INHALATION", "OPHTHALMIC", "OTIC", "NASAL", "RECTAL", "OTHER"];

export function PrescriptionFormModal({
  onClose,
  onSave,
  initialValue,
}: {
  onClose: () => void;
  onSave: (item: any) => void;
  initialValue?: any;
}) {
  // === CAMPOS DO SCHEMA ===
  const [name, setName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [frequencyEvery, setFrequencyEvery] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [route, setRoute] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name || '');
      setDoseValue(initialValue.doseValue?.toString?.() || '');
      setDoseUnit(initialValue.doseUnit || '');
      setFrequencyEvery(initialValue.frequencyEvery?.toString?.() || '');
      setFrequencyUnit(initialValue.frequencyUnit || '');
      setRoute(initialValue.route || '');
      setDurationDays(initialValue.durationDays?.toString?.() || '');
      setInstructions(initialValue.instructions || '');
    }
  }, [initialValue]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSave({
      name,
      doseValue: doseValue ? Number(doseValue) : undefined,
      doseUnit: doseUnit || undefined,
      frequencyEvery: frequencyEvery ? Number(frequencyEvery) : undefined,
      frequencyUnit: frequencyUnit || undefined,
      route: route || undefined,
      durationDays: durationDays ? Number(durationDays) : undefined,
      instructions: instructions || undefined,
    });
  };

  return (
    <Modal animationType="slide" transparent visible>
      <View className="flex-1 justify-end bg-black/50">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View className="bg-[#1C1F26] p-6 rounded-t-2xl border-t border-[#2A3340]">

            {/* HEADER */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl text-white font-semibold">
                {initialValue ? "Edit Medication" : "Add Medication"}
              </Text>

              <TouchableOpacity onPress={onClose}>
                <Text className="text-red-400 text-lg">Close</Text>
              </TouchableOpacity>
            </View>

            {/* NAME */}
            <Input
              label="Medication Name"
              iconName="medkit"
              value={name}
              onChangeText={setName}
              placeholder="Dipyrone, Ibuprofen..."
            />

            {/* DOSE VALUE */}
            <Input
              label="Dose Value"
              iconName="flask"
              value={doseValue}
              onChangeText={setDoseValue}
              placeholder="500"
              keyboardType="numeric"
            />

            {/* DOSE UNIT */}
            <SelectDropDownSimple
              label="Dose Unit"
              options={DOSE_UNITS}
              value={doseUnit}
              onChange={setDoseUnit}
              iconName="cube"
            />

            {/* FREQUENCY EVERY */}
            <Input
              label="Frequency - Every"
              iconName="time"
              value={frequencyEvery}
              onChangeText={setFrequencyEvery}
              placeholder="8"
              keyboardType="numeric"
            />

            {/* FREQUENCY UNIT */}
            <SelectDropDownSimple
              label="Frequency Unit"
              options={FREQUENCY_UNITS}
              value={frequencyUnit}
              onChange={setFrequencyUnit}
              iconName="repeat"
            />

            {/* ROUTE */}
            <SelectDropDownSimple
              label="Route"
              options={ROUTES}
              value={route}
              onChange={setRoute}
              iconName="git-commit"
            />

            {/* DURATION DAYS */}
            <Input
              label="Duration (days)"
              iconName="calendar"
              value={durationDays}
              onChangeText={setDurationDays}
              placeholder="3"
              keyboardType="numeric"
            />

            {/* INSTRUCTIONS */}
            <Input
              label="Instructions"
              iconName="document-text"
              value={instructions}
              onChangeText={setInstructions}
              placeholder="Take with food, avoid at night..."
              multiline
            />

            {/* SAVE BUTTON */}
            <Button
              title={initialValue ? "Save changes" : "Add"}
              onPress={handleSubmit}
              className="mt-4"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
