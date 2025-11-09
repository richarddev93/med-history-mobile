import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Screen } from '@/components/ui';
import { useEffect, useState } from 'react';
import { attachmentsApi } from '@/modules/attachments/data/attachments.api';
import { prescriptionsApi } from '@/modules/prescriptions/data/prescriptions.api';
import { useEncounter } from '@/modules/encounters/hooks/useEncounter';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';

export default function EncounterDetailScreen({ route }: any) {
  // State for prescriptions and attachments
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
  const [loadingAttachments, setLoadingAttachments] = useState(false);

  useEffect(() => {
    if (encounter?.patientId) {
      setLoadingPrescriptions(true);
      prescriptionsApi.getByPersonId(encounter.patientId)
        .then(setPrescriptions)
        .catch(console.error)
        .finally(() => setLoadingPrescriptions(false));
    }
    if (encounter?.id) {
      setLoadingAttachments(true);
      attachmentsApi.listByEncounter(encounter.id)
        .then(setAttachments)
        .catch(console.error)
        .finally(() => setLoadingAttachments(false));
    }
  }, [encounter?.patientId, encounter?.id]);
  const { encounterId, encounter: encounterParam } = route.params || {};
  const navigation = useNavigation<any>();
  // useEncounter provides local store and delete handler
  const { encounters, deleteEncounter } = useEncounter((encounterParam && encounterParam.patientId) || '');

  // try to find encounter in store, fall back to route param
  const encounter = encounters?.find((e) => e.id === encounterId) || encounterParam || null;

  const formatted = (raw: string) => (raw ? format(new Date(raw), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : '');

  if (!encounter) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">Encounter not found</Text>
        </View>
      </Screen>
    );
  }

  const confirmDelete = () => {
    Alert.alert('Delete encounter', 'Are you sure you want to delete this encounter?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteEncounter && deleteEncounter(encounter.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-white">Encounter</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Text className="text-sm text-gray-300">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4 bg-card p-4 rounded-md border border-[#1F2A3C]">
          <View className="flex-row justify-between items-start">
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text className="text-sm text-gray-300">Type</Text>
              <Text className="text-lg font-semibold text-white mb-2">{encounter.type}</Text>

              <Text className="text-sm text-gray-300">Occurred at</Text>
              <Text className="text-base text-white mb-2">{formatted(encounter.occurredAt)}</Text>
            </View>

            <TouchableOpacity onPress={confirmDelete} className="p-2">
              <Ionicons name="trash-outline" size={22} color={'#FF6B6B'} />
            </TouchableOpacity>
          </View>

          {encounter.reason ? (
            <View className="mt-2 mb-2 rounded-md border-l-4 border-primary bg-primary/5 p-3">
              <Text className="text-base font-semibold text-white">{encounter.reason}</Text>
            </View>
          ) : null}

          {encounter.notes ? (
            <>
              <Text className="text-sm text-gray-300">Notes</Text>
              <Text className="text-base text-gray-200">{encounter.notes}</Text>
            </>
          ) : null}

          <View className="mt-4">
            <Text className="text-xs text-gray-400">Created at: {formatted(encounter.createdAt || encounter.occurredAt)}</Text>
            <Text className="text-xs text-gray-400">Updated at: {formatted(encounter.updatedAt || encounter.occurredAt)}</Text>
            <Text className="text-xs text-gray-400">Created by: {encounter.createdById || '—'}</Text>
          </View>
        </View>

        {/* Prescriptions Section */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-white mb-2">Prescriptions</Text>
          {loadingPrescriptions ? (
            <Text className="text-xs text-gray-400">Loading...</Text>
          ) : prescriptions.length === 0 ? (
            <Text className="text-xs text-gray-400">No prescriptions found.</Text>
          ) : (
            <View className="space-y-2">
              {prescriptions.map((p) => (
                <View key={p.id} className="bg-card p-3 rounded-md border border-[#1F2A3C]">
                  <Text className="text-white font-semibold">{p.medicationName || p.name}</Text>
                  <Text className="text-xs text-gray-400">{p.dosage || p.instructions}</Text>
                  <Text className="text-xs text-gray-400">Prescribed: {formatted(p.createdAt)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Attachments Section */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-white mb-2">Attachments</Text>
          {loadingAttachments ? (
            <Text className="text-xs text-gray-400">Loading...</Text>
          ) : attachments.length === 0 ? (
            <Text className="text-xs text-gray-400">No attachments found.</Text>
          ) : (
            <View className="space-y-2">
              {attachments.map((a) => (
                <View key={a.id} className="flex-row items-center justify-between bg-card p-3 rounded-md border border-[#1F2A3C]">
                  <View>
                    <Text className="text-white">{a.filename || a.name}</Text>
                    <Text className="text-xs text-gray-400">Uploaded: {formatted(a.createdAt)}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Delete action is available in the top-right trash icon on the card */}
      </ScrollView>
    </Screen>
  );
}
