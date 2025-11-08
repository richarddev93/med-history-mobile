import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { usePeopleStore } from '../store/usePeopleStore';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/useAuthStore';

import Screen from '@/components/ui/Screen';
import FAB from '@/components/ui/FAB';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';

export function PeopleListScreen({ navigation }: any) {
  const { list, loading, fetchPeople } = usePeopleStore();
  const [error, setError] = React.useState<string | null>(null);

  const getPeopleList = useCallback(async () => {
    try {
      await fetchPeople();
      setError(null);
    } catch {
      setError('Erro ao buscar pessoas');
    }
  }, [fetchPeople]);

  useEffect(() => {
    getPeopleList();
  }, [getPeopleList]);

  const renderPeople = () => {
    if (error) {
      return (
        <TouchableOpacity onPress={() => { setError(null); getPeopleList(); }}>
          <Ionicons name="reload-circle" size={20} color={'white'} />
          <Text>Tente novamente</Text>
        </TouchableOpacity>
      );
    }
    if (!loading && list.length <= 0) {
      return (
        <View className="items-center justify-center mt-8">
          <Text className="text-gray-400">Nenhuma pessoa encontrada.</Text>
        </View>
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
                <Avatar name={item.fullname} size={56} />
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

  const logout = useAuthStore((s) => s.logout);

  return (
    <Screen scroll={false}>
      <View className="flex h-32 flex-row items-center justify-between  bg-secondary px-4">
        <View className="flex-1 text-text">
          <Text className=" text-2xl font-extrabold text-text">Machcare</Text>
          <Text className="text-text">Saúde da familia</Text>
        </View>
        <TouchableHighlight
          className="flex  h-16 w-16 items-center justify-center rounded-full bg-surface"
          onPress={() => {
            logout();
          }}
        >
          <Ionicons name="log-out-outline" size={20} color={'white'} />
        </TouchableHighlight>
      </View>
      <View className="flex-1">
        <View className="justify-between gap-6 px-4 py-6">
          <TextInput
            className="rounded-md border border-surface bg-card px-3 py-3 text-text"
            placeholder="Buscar..."
            placeholderTextColor="#95A5A6"
          />
        </View>
        {renderPeople()}
        {/* Floating Add button */}
        <FAB onPress={() => navigation.navigate('PeopleForm')} />
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
