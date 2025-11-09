
import React, { useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

export function AttachmentUploadScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  const pickDocument = async () => {
    setError(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        navigation.navigate('PrescriptionForm', {
          attachment: {
            name: asset.name,
            uri: asset.uri,
            mimeType: asset.mimeType,
          },
        });
      }
    } catch (err) {
      console.error('Error picking document:', err);
      Alert.alert(
        'Erro ao selecionar documento',
        'Não foi possível selecionar o arquivo. Por favor, tente novamente.'
      );
      setError('Não foi possível selecionar o documento.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar Documento" onPress={pickDocument} />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
