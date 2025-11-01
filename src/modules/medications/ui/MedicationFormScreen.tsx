
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useMedicationsVM } from '../vm/useMedicationsVM';

export function MedicationFormScreen({ navigation, route }: any) {
  const { personId } = route.params;
  const { createMedication, loading, error } = useMedicationsVM();

  const handleSave = async () => {
    // TODO: Get form data
    const medicationData = { name: 'Test Medication', doseValue: 1, doseUnit: 'mg', frequencyEvery: 8, frequencyUnit: 'hours', route: 'oral', personId };
    await createMedication(medicationData);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Medication Form Screen</Text>
      {/* TODO: Implement form fields */}
      {loading && <Text>Saving...</Text>}
      {error && <Text>{error}</Text>}
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
