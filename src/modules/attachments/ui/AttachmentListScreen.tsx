
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export function AttachmentListScreen({ navigation }: any) {
  // TODO: Fetch and display attachments
  const attachments:any[] = [];

  return (
    <View>
      <Text>Attachment List Screen</Text>
      <FlatList
        data={attachments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.filename}</Text>
            <Text>{item.ocrStatus}</Text>
          </View>
        )}
      />
      <Button title="Upload" onPress={() => navigation.navigate('AttachmentUpload')} />
    </View>
  );
}
