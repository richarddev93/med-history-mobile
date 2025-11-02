
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';
import { CreateMedication } from '../../medications/schemas/medications.schema';

export function PrescriptionItemFormScreen({ navigation, route }: any) {
  const { prescriptionId } = route.params;
  const { addItem, loading } = usePrescriptionsVM();
  const [name, setName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [frequencyEvery, setFrequencyEvery] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [routeInput, setRouteInput] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = async () => {
    const itemData: CreateMedication = {
      name,
      doseValue: parseFloat(doseValue),
      doseUnit,
      frequencyEvery: parseInt(frequencyEvery, 10),
      frequencyUnit,
      route: routeInput,
      durationDays: durationDays ? parseInt(durationDays, 10) : undefined,
      instructions,
    };

    await addItem(prescriptionId, itemData);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Adicionar Medicamento na Prescrição</Text>
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
