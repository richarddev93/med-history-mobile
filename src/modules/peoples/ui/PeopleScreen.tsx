import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { usePeopleStore } from '../store/usePeopleStore';
import { Ionicons } from '@expo/vector-icons';

import Screen from '@/components/ui/Screen';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export function PeopleListScreen({ navigation }: any) {
  const { list, loading, fetchPeople } = usePeopleStore();

  useEffect(() => {
    getPeopleList();
  }, []);

  const getPeopleList = useCallback(() => {
    fetchPeople();
  }, [fetchPeople]);

  const renderPeople = () => {
    if (!loading && list.length <= 0) {
      return (
        <TouchableOpacity>
          <Ionicons name="reload-circle" size={20} color={'white'} />
          <Text>Tente novamente</Text>
        </TouchableOpacity>
      );
    }
    return (
      <FlatList
        refreshing={loading}
        data={list}
        keyExtractor={(i) => i.id}
        onRefresh={getPeopleList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PersonDetails', { id: item.id })}>
            <Card className="mx-4 flex-row items-center gap-2">
              <View className="items-center rounded-full">
                <Image
                  source={require('../../../../assets/logo_horizontal.png')}
                  className="h-16 w-16 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 items-start ">
                <Text className="text-xl font-bold text-text">{item.fullname}</Text>
                <Text className="text-lg text-muted">{item.document}</Text>
              </View>
              <Ionicons name="person" size={20} color={'white'} />
            </Card>
          </TouchableOpacity>
        )}
      />
    );
  };

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
      <View className="flex-1">
        <View className="justify-between gap-6 px-4 py-6">
          <TextInput
            className="rounded-md border border-surface bg-card px-3 py-3 text-text"
            placeholder="Buscar..."
            placeholderTextColor="#95A5A6"
          />
          <Button title="Adicionar membro" className="h-16" />
        </View>
        {renderPeople()}
{/* 
        <FlatList
          refreshing={loading}
          data={list}
          keyExtractor={(i) => i.id}
          onRefresh={getPeopleList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('PersonDetails', { id: item.id })}>
              <Card className="mx-4 flex-row items-center gap-2">
                <View className="items-center rounded-full">
                  <Image
                    source={require('../../../../assets/logo_horizontal.png')}
                    className="h-16 w-16 rounded-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1 items-start ">
                  <Text className="text-xl font-bold text-text">{item.fullname}</Text>
                  <Text className="text-lg text-muted">{item.document}</Text>
                </View>
                <Ionicons name="person" size={20} color={'white'} />
              </Card>
            </TouchableOpacity>
          )}
        /> */}
      </View>
    </Screen>
  );
}
