import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Screen, Input, Button } from '@/components/ui';
import { useEncounter } from '@/modules/encounters/hooks/useEncounter';
import { CreateEncounterSchema, EncounterType } from '../schemas/encounters.schema';
import { Header } from '@/components';
import { DatePicker } from '@/components/ui/DatePicker';
import SelectDropDownSimple from '@/components/ui/SelectDropDownSimple';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PrescriptionFormModal } from '@/modules/prescriptions/ui/PrescriptionFormModal';

export default function EncounterFormScreen({ navigation, route }: any) {
  const { personId } = route.params;
  const { encounterMutate } = useEncounter(personId);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // campos normais
  const [type, setType] = useState<EncounterType>('' as EncounterType);
  const [occurredAt, setOccurredAt] = useState(new Date().toISOString());
  const [time, setTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  // PRESCRIÇÕES
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<number | null>(null);

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(':').map(Number);
    date.setHours(hours, minutes);
    return date.toISOString();
  };

  const addPrescription = (item: any) => {
    if (editingPrescription !== null) {
      // editar
      const updated = [...prescriptions];
      updated[editingPrescription] = item;
      setPrescriptions(updated);
      setEditingPrescription(null);
    } else {
      // adicionar
      setPrescriptions([...prescriptions, item]);
    }
    setShowPrescriptionForm(false);
  };

  const mockOCR = () => {
    const ocrResult = [
      {
        medication: 'Dipirona',
        dose: '500mg',
        frequency: '1 comp. 8/8h',
        duration: '3 dias',
        observations: '',
      },
      {
        medication: 'Buscopan',
        dose: '10mg',
        frequency: '1 comp. 12/12h',
        duration: '5 dias',
        observations: '',
      },
    ];

    setPrescriptions(ocrResult);
  };

  const handleSave = async () => {
    const payload = {
      patientId: personId,
      type,
      occurredAt: formatDateTime(occurredAt, time),
      reason,
      notes,
      prescriptions,
    };

    await encounterMutate.mutateAsync(payload);
    navigation.goBack();
  };

  return (
    <Screen>
      <Header title="Encounter" onHandle={handleSave} onHandleBack={navigation.goBack} />

      <KeyboardAwareScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        extraScrollHeight={120}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
      >
        <Text className="mb-2 text-lg text-gray-400">Consultation Details</Text>
        <SelectDropDownSimple
          label="Type"
          iconName="list"
          options={['EMERGENCY', 'OUTPATIENT']}
          value={type}
          onChange={setType}
        />
        {errors.type && <Text className="text-sm text-red-400">{errors.type}</Text>}

        <View className="mt-2 flex flex-row gap-2">
          <DatePicker
            iconName="calendar"
            label="Occurred At"
            dateValue={new Date(occurredAt)}
            setDateValue={(d) => setOccurredAt(d.toISOString())}
          />
          <DatePicker
            iconName="time"
            label="Time"
            mode="time"
            dateValue={new Date(`1970-01-01T${time}`)}
            setDateValue={(d) => setTime(d.toLocaleTimeString('pt-BR'))}
          />
        </View>

        <Input
          iconName="medkit"
          label="Healthcare Provider"
          value=""
          onChangeText={() => {}}
          placeholder="Healthcare Provider (optional)"
          editable={false}
        />

        <Input
          iconName="document-text"
          label="Reason"
          value={reason}
          onChangeText={setReason}
          placeholder="Reason (optional)"
          multiline
        />
        <Input
          iconName="document-text"
          label="Additional Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes (optional)"
          multiline
        />
        {errors.notes && <Text className="text-sm text-red-400">{errors.notes}</Text>}

        <Text className="mt-4 text-lg text-gray-400">Prescriptions</Text>

        {prescriptions.map((p, i) => (
          <View key={i} className="mt-2 rounded-md border border-[#2A3340] bg-[#1C1F26] p-3">
            <Text className="font-bold text-text">
              {p.medication} {p.dose}
            </Text>
            <Text className="text-gray-400">{p.frequency}</Text>
            <Text className="text-gray-400">{p.duration}</Text>

            <View className="mt-2 flex-row gap-4">
              <TouchableOpacity
                onPress={() => {
                  setEditingPrescription(i);
                  setShowPrescriptionForm(true);
                }}>
                <Text className="text-blue-400">Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setPrescriptions(prescriptions.filter((_, idx) => idx !== i))}>
                <Text className="text-red-400">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View className="mt-4 gap-3">
          <Button title="Add medication" onPress={() => setShowPrescriptionForm(true)} />
          <Button title="Import via OCR" onPress={mockOCR} />
        </View>

        <Button title="Save" onPress={handleSave} className="mt-6" />
      </KeyboardAwareScrollView>

        {showPrescriptionForm && (
          <PrescriptionFormModal
            onClose={() => {
              setShowPrescriptionForm(false);
              setEditingPrescription(null);
            }}
            onSave={addPrescription}
            initialValue={editingPrescription !== null ? prescriptions[editingPrescription] : null}
          />
        )}

    </Screen>
  );
}
