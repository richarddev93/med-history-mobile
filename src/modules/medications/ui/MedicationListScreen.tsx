
import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useMedicationsVM } from '../vm/useMedicationsVM';
import FAB from '@/components/ui/FAB';

export function MedicationListScreen({ navigation, route }: any) {
  const { personId } = route.params;
  const { medications, loading, error, getAllByPerson } = useMedicationsVM();

  useEffect(() => {
    getAllByPerson(personId);
  }, [personId, getAllByPerson]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Medication List Screen</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <FAB onPress={() => navigation.navigate('MedicationForm', { personId })} />
    </View>
  );
}
