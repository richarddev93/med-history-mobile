
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAttachmentsVM } from '../vm/useAttachmentsVM';

export function AttachmentUploadScreen() {
  const { uploadAttachment, loading, error } = useAttachmentsVM();

  return (
    <View>
      <Text>Attachment Upload Screen</Text>
      {loading && <Text>Uploading...</Text>}
      {error && <Text>{error}</Text>}
      <Button title="Select and Upload" onPress={uploadAttachment} />
    </View>
  );
}
