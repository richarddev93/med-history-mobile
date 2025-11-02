
import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useAttachmentsVM } from '../vm/useAttachmentsVM';

export function AttachmentListScreen({ route }: any) {
  const { personId } = route.params;
  const { attachments, loading, error, getAllByPerson, createAttachment, deleteAttachment } = useAttachmentsVM();

  useEffect(() => {
    getAllByPerson(personId);
  }, [personId, getAllByPerson]);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled === false) {
        // Expo DocumentPicker returns assets array, we take the first one.
        const file = result.assets[0];
        if (file) {
            await createAttachment(personId, file);
        }
      }    
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  return (
    <View>
      <Text>Anexos</Text>
      <Button title="Adicionar Anexo" onPress={handlePickDocument} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <FlatList
        data={attachments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <Text>{item.fileName}</Text>
            <TouchableOpacity onPress={() => deleteAttachment(item.id)}>
              <Text style={{ color: 'red' }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
