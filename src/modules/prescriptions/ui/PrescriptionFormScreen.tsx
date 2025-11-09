
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePrescriptionsVM } from '../vm/usePrescriptionsVM';
import { CreateMedication } from '../../medications/schemas/medications.schema';

export function PrescriptionFormScreen({ route }: any) {
  const navigation = useNavigation();
  const { personId } = route.params;
  const { create, loading, error } = usePrescriptionsVM();
  const [items, setItems] = useState<CreateMedication[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);

  useEffect(() => {
    if (route.params?.item) {
      setItems((prev) => [...prev, route.params.item]);
    }
    if (route.params?.attachment) {
      setAttachments((prev) => [...prev, route.params.attachment]);
    }
  }, [route.params?.item, route.params?.attachment]);

  const handleSave = async () => {
    if (items.length === 0) {
      Alert.alert('Nenhum item', 'Adicione pelo menos um medicamento à prescrição.');
      return;
    }

    await create({ personId, items, attachments });

    if (!error) {
      Alert.alert('Sucesso', 'Prescrição criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Erro', 'Não foi possível criar a prescrição.');
    }
  };

  return (
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
