import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import { Screen, Button } from '@/components/ui';
import { useNavigation } from '@react-navigation/native';
import { usePeopleStore } from '@/modules/peoples/store/usePeopleStore';
import { Ionicons } from '@expo/vector-icons';
type Tab = 'encounters' | 'prescriptions' | 'medications' | 'attachments';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEncounter } from '@/modules/encounters/hooks/useEncounter';
import { FlatList } from 'react-native-gesture-handler';
import Card from '@/components/ui/Card';
export function PeopleDetailScreen({ route }: any) {
  const { id } = route.params;
  const navigation = useNavigation<any>();
  const { list, fetchPeople } = usePeopleStore();
  const { encounters, loading } = useEncounter(id);
  const [tab, setTab] = useState<Tab>('encounters');

  const person = list.find((p) => p.id === id);

  useEffect(() => {
    if (!person) fetchPeople();
  }, []);

  // encounters are fetched by the useEncounter hook (react-query). No direct store requests.

  if (!person) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Carregando informações...</Text>
        </View>
      </Screen>
    );
  }

  const age = person.birthDate
    ? Math.floor((Date.now() - new Date(person.birthDate).getTime()) / 31557600000)
    : '-';

  const formatted = (raw: string) =>
    format(new Date(raw), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <Screen>
      <View className="flex h-auto max-h-56 justify-between  bg-secondary">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4 p-2">
            <Ionicons name="arrow-back" size={20} color={'white'} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-white">Person Details</Text>
        </View>

        {/* person detail */}
        <View className="flex-row items-center  p-4 pb-0">
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/921/921071.png',
            }}
            className="mr-4 h-16 w-16 rounded-full"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-white">{person.fullname}</Text>
            <Text className="text-gray-300">
              {person.document ? `${person.document} • ` : ''}
              {`Age ${age}`}
            </Text>
            {person.birthDate && (
              <Text className="text-xs text-gray-400">DOB: {formatted(person.birthDate)}</Text>
            )}
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="arrow-up-right-box-outline" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <View className="m-4 flex-row flex-wrap gap-2">
          {['Hypertension', 'Diabetes', 'High Cholesterol'].map((t) => (
            <View key={t} className="rounded-full border border-sky-600 bg-primary px-3 py-1">
              <Text className="text-xs text-gray-200">{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView className="p-4">
        {/* === Tags de condições simuladas (pode vir do backend depois) === */}

        {/* === Tabs === */}
        <View className="mb-3 flex-row justify-between">
          <TouchableOpacity onPress={() => setTab('encounters')}>
            <Text
              className={`${
                tab === 'encounters' ? 'font-semibold text-blue-400' : 'text-gray-400'
              }`}>
              Encounters
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('prescriptions')}>
            <Text
              className={`${
                tab === 'prescriptions' ? 'font-semibold text-blue-400' : 'text-gray-400'
              }`}>
              Prescriptions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('medications')}>
            <Text
              className={`${
                tab === 'medications' ? 'font-semibold text-blue-400' : 'text-gray-400'
              }`}>
              Medication
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('attachments')}>
            <Text
              className={`${
                tab === 'attachments' ? 'font-semibold text-blue-400' : 'text-gray-400'
              }`}>
              Attachments
            </Text>
          </TouchableOpacity>
        </View>

        {/* === Conteúdo dinâmico da Tab === */}
        {tab === 'encounters' && (
          <View className="gap-4">
            <Button
              title="+ Add Medical Encounter"
              onPress={() => navigation.navigate('EncounterForm', { personId: id })}
            />

            {/* cards simulados */}
            <FlatList
              refreshing={loading}
              data={encounters}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id.toString()} onPress={() => console.log('navega para detalhes da consulta')}>
                  <Card className=" gap-2 rounded-xl">
                    <Text className="font-semibold text-white">{item.type}</Text>
                    <Text className="mt-1 text-sm text-gray-300">{item.occurredAt}</Text>
                    <Text className="mt-2 text-xs text-gray-400">{item.reason} </Text>
                    <Text className="mt-1 text-sm text-gray-400">{item.notes}</Text>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {tab === 'prescriptions' && (
          <View>
            <Button
              title="+ New Prescription"
              onPress={() => navigation.navigate('PrescriptionForm', { personId: id })}
            />
            <Text className="mt-3 text-gray-400">Prescriptions list coming soon...</Text>
          </View>
        )}

        {tab === 'medications' && (
          <View>
            <Button
              title="+ Add Medication"
              onPress={() => navigation.navigate('MedicationForm', { personId: id })}
            />
            <Text className="mt-3 text-gray-400">
              Continuous medication tracking coming soon...
            </Text>
          </View>
        )}

        {tab === 'attachments' && (
          <View>
            <Button
              title="+ Upload Attachment"
              onPress={() => navigation.navigate('AttachmentUpload', { personId: id })}
            />
            <Text className="mt-3 text-gray-400">Attachments list coming soon...</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
