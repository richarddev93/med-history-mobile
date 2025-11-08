import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Screen, Input, Button } from '@/components/ui';
import { useEncounter } from '@/modules/encounters/hooks/useEncounter';
import { CreateEncounterSchema } from '../schemas/encounters.schema';

export default function EncounterFormScreen({ navigation, route }: any) {
  const { personId } = route.params;
  const { encounterMutate } = useEncounter(personId);

  const [type, setType] = useState('');
  const [typeOpen, setTypeOpen] = useState(false);
  const [occurredAt, setOccurredAt] = useState(new Date().toISOString());
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    setErrors({});

    const payload = {
      patientId: personId,
      type,
      occurredAt,
      reason: reason || undefined,
      notes: notes || undefined,
    };

    const parsed = CreateEncounterSchema.safeParse(payload);
    if (!parsed.success) {
      const zErrors: Record<string, string> = {};
      for (const [key, issue] of Object.entries(parsed.error.flatten().fieldErrors)) {
        zErrors[key] = (issue && issue[0]) || 'Invalid value';
      }
      setErrors(zErrors);
      return;
    }

    try {
      setSubmitting(true);
      await encounterMutate.mutateAsync(parsed.data as any);
      navigation.goBack();
    } catch (err) {
      console.error('Failed to create encounter', err);
      setErrors({ general: 'Failed to save. Try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <View className="p-4">
        <Text className="text-lg font-semibold text-white mb-4">New Medical Encounter</Text>

        <View className="mb-4">
          <Text className="text-text mb-1 text-sm">Type</Text>
          <TouchableOpacity
            onPress={() => setTypeOpen((s) => !s)}
            className="bg-card text-text px-3 py-3 rounded-md border border-[#1F2A3C]"
          >
            <Text className="text-white">{type || 'Select encounter type'}</Text>
          </TouchableOpacity>
          {typeOpen && (
            <View className="mt-2 rounded-md overflow-hidden border border-[#1F2A3C] bg-card">
              {['EMERGENCY', 'OUTPATIENT'].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => {
                    setType(t);
                    setTypeOpen(false);
                  }}
                  className="px-3 py-3"
                >
                  <Text className={`text-sm ${type === t ? 'text-blue-400 font-semibold' : 'text-white'}`}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errors.type && <Text className="text-red-400 text-sm">{errors.type}</Text>}
        </View>

        <Input
          label="Occurred At"
          value={occurredAt}
          onChangeText={setOccurredAt}
          placeholder="YYYY-MM-DDTHH:mm:ssZ"
        />
        {errors.occurredAt && <Text className="text-red-400 text-sm">{errors.occurredAt}</Text>}

        <Input label="Reason" value={reason} onChangeText={setReason} placeholder="Reason (optional)" />
        {errors.reason && <Text className="text-red-400 text-sm">{errors.reason}</Text>}

        <Input label="Notes" value={notes} onChangeText={setNotes} placeholder="Notes (optional)" />
        {errors.notes && <Text className="text-red-400 text-sm">{errors.notes}</Text>}

        {errors.general && <Text className="text-red-400 text-sm mb-2">{errors.general}</Text>}

        <Button title="Save" onPress={handleSave} loading={submitting} />
      </View>
    </Screen>
  );
}
