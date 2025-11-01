import React, { useEffect } from 'react';
import { FlatList, Text, TextInput, TouchableHighlight, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Screen from '@/components/ui/Screen';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useMedsStore } from '../store/useMedStore';
export default function PeopleScreen() {
  const { logs, fetchLogs, removeLog, loading } = useMedsStore();

  const LOGS = [
    {
      id: '1',
      item: '',
    },
  ];
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Screen scroll={false}>
      <View className="flex h-32 flex-row items-center justify-between  bg-secondary px-4">
        <View className="flex-1 text-text">
          <Text className=" text-2xl font-extrabold text-text">Machcare</Text>
          <Text className="text-text">Saúde da familia</Text>
        </View>
        <TouchableHighlight className="flex  h-16 w-16 items-center justify-center rounded-full bg-surface">
          <Ionicons name="person-outline" size={20} color={'white'} />
        </TouchableHighlight>
      </View>
      <View className="px-4 py-6 justify-between gap-6">
        <TextInput
          className="rounded-md border border-surface bg-card px-3 py-3 text-text"
          placeholder="Buscar..."
          placeholderTextColor="#95A5A6"
        />
        <Button title='Adicionar membro' className='h-16'/>
      </View>
      <FlatList
        refreshing={loading}
        data={LOGS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card className="mx-4 flex-row items-center gap-2">
            <View className="items-center rounded-full">
              <Image
                source={require('../../../../assets/logo_horizontal.png')}
                className="h-16 w-16 rounded-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 items-start ">
              <Text className="text-xl font-bold text-text">Melina</Text>
              <Text className="text-lg text-muted">filha</Text>
            </View>
            <Ionicons name="person" size={20} color={'white'} />
          </Card>
        )}
      />
    </Screen>
  );
}
