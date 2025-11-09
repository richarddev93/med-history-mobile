
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useAttachmentsVM } from '../vm/useAttachmentsVM';
import { useEncounter } from '@/modules/encounters/hooks/useEncounter';

export function AttachmentUploadScreen({ route }: any) {
  const personId = route?.params?.personId || '';
  const { createAttachment, loading, error } = useAttachmentsVM();
  const { encounters } = useEncounter(personId);
  const [selectedEncounterId, setSelectedEncounterId] = useState('');

  const handleUpload = () => {
    if (!selectedEncounterId) return;
    createAttachment(personId, /* file */ null, selectedEncounterId); // Adapte para pegar o arquivo real
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Attachment Upload Screen</Text>
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
      <Button title="Select and Upload" onPress={handleUpload} disabled={loading || !selectedEncounterId} />
      {loading && <Text>Uploading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
