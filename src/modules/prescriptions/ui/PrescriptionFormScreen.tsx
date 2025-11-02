
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';

export function PrescriptionFormScreen({ navigation }: any) {
  const [personId, setPersonId] = useState('');
  const { create, loading, error } = usePrescriptionsVM();

  const handleSave = async () => {
    await create({ personId });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>New Prescription</Text>
      <TextInput
        placeholder="Person ID"
        value={personId}
        onChangeText={setPersonId}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />
      <Button title="Save Prescription" onPress={handleSave} disabled={loading} />
      {loading && <Text>Saving...</Text>}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
}
