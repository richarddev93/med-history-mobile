
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';

export function PrescriptionItemFormScreen({ route, navigation }: any) {
  const { prescriptionId } = route.params;
  const { addItem, loading, error } = usePrescriptionsVM();
  const [name, setName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [frequencyEvery, setFrequencyEvery] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [routeInstruction, setRouteInstruction] = useState('');

  const handleSave = async () => {
    const item = {
      name,
      doseValue: parseInt(doseValue),
      doseUnit,
      frequencyEvery: parseInt(frequencyEvery),
      frequencyUnit,
      route: routeInstruction,
    };
    await addItem(prescriptionId, item);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Prescription Item Form Screen</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Dose Value" value={doseValue} onChangeText={setDoseValue} keyboardType="numeric" />
      <TextInput placeholder="Dose Unit" value={doseUnit} onChangeText={setDoseUnit} />
      <TextInput placeholder="Frequency Every" value={frequencyEvery} onChangeText={setFrequencyEvery} keyboardType="numeric" />
      <TextInput placeholder="Frequency Unit" value={frequencyUnit} onChangeText={setFrequencyUnit} />
      <TextInput placeholder="Route" value={routeInstruction} onChangeText={setRouteInstruction} />
      {loading && <Text>Saving...</Text>}
      {error && <Text>{error}</Text>}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
