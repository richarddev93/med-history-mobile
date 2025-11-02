
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';

export function PrescriptionListScreen({ navigation }: any) {
  const { prescriptions, loading, error, getAll } = usePrescriptionsVM();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PrescriptionDetails', { prescriptionId: item.id })}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>Prescription for: {item.personId}</Text>
        <Text>{item.items?.length || 0} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Button title="Create New Prescription" onPress={() => navigation.navigate('PrescriptionForm')} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={prescriptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
