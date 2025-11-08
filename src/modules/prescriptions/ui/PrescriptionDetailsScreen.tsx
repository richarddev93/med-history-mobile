
import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';
import FAB from '@/components/ui/FAB';

export function PrescriptionDetailsScreen({ route, navigation }: any) {
  const { prescriptionId } = route.params;
  const { prescription, loading, error, getById } = usePrescriptionsVM();

  useEffect(() => {
    getById(prescriptionId);
  }, [prescriptionId, getById]);

  return (
    <View>
      <Text>Prescription Details Screen</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {prescription && (
        <View>
          <Text>ID: {prescription.id}</Text>
          <Text>Person ID: {prescription.personId}</Text>
          <Text>Items:</Text>
          <FlatList
            data={prescription.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.doseValue} {item.doseUnit}</Text>
              </View>
            )}
          />
        </View>
      )}
      <FAB onPress={() => navigation.navigate('PrescriptionItemForm', { prescriptionId })} />
    </View>
  );
}
