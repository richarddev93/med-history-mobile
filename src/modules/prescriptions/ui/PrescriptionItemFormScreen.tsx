
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateMedication } from '../../medications/schemas/medications.schema';

export function PrescriptionItemFormScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [frequencyEvery, setFrequencyEvery] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [routeInput, setRouteInput] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [instructions, setInstructions] = useState('');

  const validateAndGetData = (): CreateMedication | null => {
    if (!name.trim()) {
      Alert.alert('Campo Obrigatório', 'O nome do medicamento é obrigatório.');
      return null;
    }
    const doseValueFloat = parseFloat(doseValue);
    if (doseValue && isNaN(doseValueFloat)) {
      Alert.alert('Valor Inválido', 'A dosagem deve ser um número.');
      return null;
    }
    const frequencyEveryInt = parseInt(frequencyEvery, 10);
    if (frequencyEvery && isNaN(frequencyEveryInt)) {
      Alert.alert('Valor Inválido', 'A frequência (a cada) deve ser um número inteiro.');
      return null;
    }
    const durationDaysInt = durationDays ? parseInt(durationDays, 10) : undefined;
    if (durationDays && isNaN(durationDaysInt)) {
      Alert.alert('Valor Inválido', 'A duração deve ser um número inteiro de dias.');
      return null;
    }

    return {
      name: name.trim(),
      doseValue: !isNaN(doseValueFloat) ? doseValueFloat : undefined,
      doseUnit: doseUnit.trim(),
      frequencyEvery: !isNaN(frequencyEveryInt) ? frequencyEveryInt : undefined,
      frequencyUnit: frequencyUnit.trim(),
      route: routeInput.trim(),
      durationDays: durationDaysInt,
      instructions: instructions.trim(),
    };
  };

  const handleSave = () => {
    const itemData = validateAndGetData();
    if (itemData) {
      navigation.navigate('PrescriptionForm', { item: itemData });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar Medicamento</Text>
      <TextInput style={styles.input} placeholder="Nome do Medicamento *" value={name} onChangeText={setName} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.flex]} placeholder="Dosagem" value={doseValue} onChangeText={setDoseValue} keyboardType="numeric" />
        <TextInput style={[styles.input, styles.flex]} placeholder="Unidade (ex: mg, ml)" value={doseUnit} onChangeText={setDoseUnit} />
      </View>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.flex]} placeholder="A cada" value={frequencyEvery} onChangeText={setFrequencyEvery} keyboardType="numeric" />
        <TextInput style={[styles.input, styles.flex]} placeholder="Unidade (ex: horas, dias)" value={frequencyUnit} onChangeText={setFrequencyUnit} />
      </View>
      <TextInput style={styles.input} placeholder="Via de Administração (ex: Oral, Tópica)" value={routeInput} onChangeText={setRouteInput} />
      <TextInput style={styles.input} placeholder="Duração do Tratamento (dias)" value={durationDays} onChangeText={setDurationDays} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Instruções Adicionais" value={instructions} onChangeText={setInstructions} multiline />
      <Button title="Adicionar à Prescrição" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
    marginRight: 10,
  },
});
