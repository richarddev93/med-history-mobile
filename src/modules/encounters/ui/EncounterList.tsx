import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Encounter = {
  id: string;
  type: string;
  occurredAt: string;
  reason?: string;
  notes?: string;
  healthcareProvider?: string;
  Prescription?: any[];
};

type Props = {
  encounters: Encounter[];
  loading?: boolean;
  onRefetch?: () => void;
  onDelete?: (id: string) => void;
  onOpen?: (encounter: Encounter) => void;
};

const formatted = (raw: string) =>
  format(new Date(raw), "dd 'de' MMMM 'de' yyyy às hh:mm", { locale: ptBR });

export default function EncounterList({ encounters, loading, onRefetch, onDelete, onOpen }: Props) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'EMERGENCY' | 'OUTPATIENT'>('ALL');
  const [typeOpen, setTypeOpen] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = encounters || [];
    if (filterType !== 'ALL') {
      list = list.filter((i) => i.type === filterType);
    }
    if (q) {
      list = list.filter(
        (i) =>
          i.type.toLowerCase().includes(q) ||
          (i.reason || '').toLowerCase().includes(q) ||
          (i.notes || '').toLowerCase().includes(q)
      );
    }
    list = list.slice().sort((a, b) => {
      const ta = new Date(a.occurredAt).getTime();
      const tb = new Date(b.occurredAt).getTime();
      return sortDesc ? tb - ta : ta - tb;
    });
    return list;
  }, [encounters, query, filterType, sortDesc]);

  const confirmDelete = (id: string) => {
    Alert.alert('Delete encounter', 'Are you sure you want to delete this encounter?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete && onDelete(id),
      },
    ]);
  };

  console.log('Rendering EncounterList with', filtered[0], 'items');
  return (
    <View>
      <View className="mb-3">
        <Input value={query} onChangeText={setQuery} placeholder="Search encounters" />

        <View className="flex-row items-center justify-between">
          <View style={{ flex: 1, marginRight: 8 }}>
            <TouchableOpacity
              onPress={() => setTypeOpen((s) => !s)}
              className="rounded-md border border-[#1F2A3C] bg-card px-3 py-3">
              <Text className="text-white">{filterType === 'ALL' ? 'All types' : filterType}</Text>
            </TouchableOpacity>
            {typeOpen && (
              <View className="mt-2 overflow-hidden rounded-md border border-[#1F2A3C] bg-card">
                {['ALL', 'EMERGENCY', 'OUTPATIENT'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => {
                      setFilterType(t as any);
                      setTypeOpen(false);
                    }}
                    className="px-3 py-3">
                    <Text
                      className={`text-sm ${filterType === t ? 'font-semibold text-blue-400' : 'text-white'}`}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View className="w-32">
            <Button
              title={sortDesc ? 'Recent' : 'Oldest'}
              onPress={() => setSortDesc((s) => !s)}
              variant="outline"
            />
          </View>
        </View>
      </View>

      <FlatList
        data={filtered}
        refreshing={!!loading}
        onRefresh={onRefetch}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onOpen?.(item)}>
            <Card className="gap-3 rounded-xl p-4">
              {/* HEADER */}
              <View className="flex-row items-start justify-between">
                <Text className="text-lg font-semibold text-white">{item.type}</Text>
                <Text className="text-sm text-gray-300">{formatted(item.occurredAt)}</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Ionicons name="medkit-outline" size={16} color="#8FA3BF" />
                <Text className="text-sm text-gray-300">{'Santa casa'}</Text>
              </View>

              {item.reason ? (
                <View className="mt-1 rounded-md border-l-4 border-primary bg-primary/5 p-3">
                  <Text className="text-base font-semibold text-white">{item.reason}</Text>
                </View>
              ) : null}

              {item.notes ? (
                <Text className="text-sm text-gray-400">
                  {item.notes.length > 120 ? item.notes.slice(0, 120) + '...' : item.notes}
                </Text>
              ) : null}

              {item.Prescription &&
                item.Prescription.length > 0 &&
                item.Prescription[0].items.length > 0 &&
                item.Prescription[0].items.map((p, i) => (
                  <View className="mt-1 flex-row items-center gap-2" key={i}>
                    <Ionicons name="list-circle-outline" size={18} color="#81A1FF" />
                    <Text className="text-sm text-gray-300">
                      {p.name} {p.doseValue} {p.doseUnit}
                    </Text>
                  </View>
                ))}

              {/* FOOTER ACTIONS */}
              <View className="mt-3 flex-row justify-end">
                <TouchableOpacity onPress={() => confirmDelete(item.id)} className="px-3 py-2">
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
