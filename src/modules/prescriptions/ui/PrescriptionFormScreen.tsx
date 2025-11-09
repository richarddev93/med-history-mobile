
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';
import { useEncounter } from '@/modules/encounters/hooks/useEncounter';


export function PrescriptionFormScreen({ navigation }: any) {

  const [personId, setPersonId] = useState('');
  const [selectedEncounterId, setSelectedEncounterId] = useState('');
  const { create, loading, error } = usePrescriptionsVM();
  const { encounters } = useEncounter(personId);

  const handleSave = async () => {
    await create({ personId, encounterId: selectedEncounterId });
    if (navigation && typeof navigation.goBack === 'function') {
      navigation.goBack();
    }
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
      {/* Encounter selection */}
      {encounters.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 8 }}>Select Encounter:</Text>
          {encounters.map((enc) => (
            <TouchableOpacity
              key={enc.id}
              style={{ padding: 10, backgroundColor: selectedEncounterId === enc.id ? '#007AFF' : '#eee', marginBottom: 6, borderRadius: 6 }}
              onPress={() => setSelectedEncounterId(enc.id)}
            >
              <Text style={{ color: selectedEncounterId === enc.id ? 'white' : 'black' }}>
                {enc.type} - {enc.occurredAt?.slice(0, 10)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Button title="Save Prescription" onPress={handleSave} disabled={loading || !personId || !selectedEncounterId} />
      {loading && <Text>Saving...</Text>}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
}
