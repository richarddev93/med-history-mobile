
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
<<<<<<< Updated upstream
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
=======
    <View style={styles.container}>
      <Text style={styles.title}>Nova Prescrição</Text>

      <View style={styles.section}>
        <Button title="Adicionar Medicamento" onPress={() => navigation.navigate('PrescriptionItemForm')} />
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum medicamento adicionado.</Text>}
        />
      </View>

      <View style={styles.section}>
        <Button title="Adicionar Anexo" onPress={() => navigation.navigate('AttachmentUpload')} />
        <FlatList
          data={attachments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum anexo adicionado.</Text>}
        />
      </View>

      <View style={styles.footer}>
        <Button title="Salvar Prescrição" onPress={handleSave} disabled={loading} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  footer: {
    marginTop: 'auto',
  },
});
