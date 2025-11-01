
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useMedicationsVM } from '../vm/useMedicationsVM';

export function PersonMedicationListScreen({ route, navigation }: any) {
  const { personId } = route.params;
  const { medications, loading, error, getMedicationsByPerson } = useMedicationsVM();

  useEffect(() => {
    getMedicationsByPerson(personId);
  }, [personId, getMedicationsByPerson]);

  return (
    <View>
      <Text>Person Medications</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} {item.doseValue}{item.doseUnit}</Text>
            <Text>Every {item.frequencyEvery} {item.frequencyUnit}</Text>
          </View>
        )}
      />
      <Button title="Add Medication" onPress={() => navigation.navigate('MedicationForm', { personId })} />
    </View>
  );
}
