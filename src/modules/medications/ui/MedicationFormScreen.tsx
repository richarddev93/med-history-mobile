
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useMedicationsVM } from '../vm/useMedicationsVM';
import { CreateMedication } from '../schemas/medications.schema';

export function MedicationFormScreen({ navigation, route }: any) {
  const { personId } = route.params;
  const { createMedication, loading } = useMedicationsVM();
  const [name, setName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [frequencyEvery, setFrequencyEvery] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [routeInput, setRouteInput] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = async () => {
    const medicationData: CreateMedication = {
      name,
      doseValue: parseFloat(doseValue),
      doseUnit,
      frequencyEvery: parseInt(frequencyEvery, 10),
      frequencyUnit,
      route: routeInput,
      durationDays: durationDays ? parseInt(durationDays, 10) : undefined,
      instructions,
    };

    await createMedication(medicationData);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Novo Medicamento</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Dosagem (valor)" value={doseValue} onChangeText={setDoseValue} keyboardType="numeric" />
      <TextInput placeholder="Dosagem (unidade)" value={doseUnit} onChangeText={setDoseUnit} />
      <TextInput placeholder="Frequência (a cada)" value={frequencyEvery} onChangeText={setFrequencyEvery} keyboardType="numeric" />
      <TextInput placeholder="Frequência (unidade)" value={frequencyUnit} onChangeText={setFrequencyUnit} />
      <TextInput placeholder="Via de administração" value={routeInput} onChangeText={setRouteInput} />
      <TextInput placeholder="Duração (dias)" value={durationDays} onChangeText={setDurationDays} keyboardType="numeric" />
      <TextInput placeholder="Instruções" value={instructions} onChangeText={setInstructions} />
      <Button title="Salvar" onPress={handleSave} disabled={loading} />
    </View>
  );
}
