import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import Screen from '@/components/ui/Screen';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useMedsStore } from '../store/useMedStore';
export default function MedsListScreen() {
  const { logs, fetchLogs, removeLog, loading } = useMedsStore();

  useEffect(() => { fetchLogs(); }, []);

  return (
    <Screen scroll={false}>
      <Text className="text-text text-xl font-semibold mb-3">Medication Logs</Text>
      <FlatList
        refreshing={loading}
        data={logs}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card>
            <View className="flex-row justify-between">
              <Text className="text-text font-semibold">{item.drug}</Text>
              <Text className={`${item.status === 'taken' ? 'text-success' : 'text-danger'} font-semibold`}>
                {item.status}
              </Text>
            </View>
            <Text className="text-muted text-sm">{item.dose}</Text>
            <Text className="text-muted text-xs">{new Date(item.takenAt).toLocaleString()}</Text>
            <Button title="Delete" onPress={() => removeLog(item.id)} />
          </Card>
        )}
      />
    </Screen>
  );
}
