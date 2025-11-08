
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useAttachmentsVM } from '../vm/useAttachmentsVM';
import FAB from '@/components/ui/FAB';

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
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Text className="text-lg text-white">Anexos</Text>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
      </View>
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
      <FAB onPress={handlePickDocument} />
    </View>
  );
}
