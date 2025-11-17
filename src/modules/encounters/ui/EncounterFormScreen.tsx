import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Screen, Input, Button } from '@/components/ui';
import { CreateEncounterSchema, EncounterType } from '../schemas/encounters.schema';
import { Header } from '@/components';
import { DatePicker } from '@/components/ui/DatePicker';
import SelectDropDownSimple from '@/components/ui/SelectDropDownSimple';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PrescriptionFormModal } from '@/modules/prescriptions/ui/PrescriptionFormModal';
import { useEncounterVM } from '../vm/useEncounterVM';
import { PrescriptionItemCard } from '@/modules/prescriptions/ui/PrescriptionItemCard';

export default function EncounterFormScreen({ navigation, route }: any) {
  const { personId } = route.params;

  const { encounterMutate, loading, error: vmError } = useEncounterVM(personId);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [type, setType] = useState<EncounterType>('' as EncounterType);
  const [occurredAt, setOccurredAt] = useState(new Date().toISOString());
  const [time, setTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [healthcareProvider, setHealthcareProvider] = useState('');

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
      const updated = [...prescriptions];
      updated[editingPrescription] = item;
      setPrescriptions(updated);
      setEditingPrescription(null);
    } else {
      setPrescriptions([...prescriptions, item]);
    }
    setShowPrescriptionForm(false);
  };

  const mockOCR = () => {
    const ocrResult = [
      {
        medication: 'Dipirona',
        doseValue: 500,
        doseUnit: 'MG',
        frequencyEvery: 8,
        frequencyUnit: 'HOUR',
        durationDays: 3,
        observations: '',
      },
      {
        medication: 'Buscopan',
        doseValue: 10,
        doseUnit: 'MG',
        frequencyEvery: 12,
        frequencyUnit: 'HOUR',
        durationDays: 5,
        observations: '',
      },
    ];
    setPrescriptions(ocrResult);
  };

  const handleSave = async () => {
    setErrors({});

    const encounterPayload = {
      patientId: personId,
      type,
      occurredAt: formatDateTime(occurredAt, time),
      healthcareProvider: healthcareProvider || undefined,
      reason: reason || undefined,
      notes: notes || undefined,
    };

    const parsed = CreateEncounterSchema.safeParse(encounterPayload);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const [key, issue] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[key] = issue?.[0] ?? 'Valor inválido';
      }

      setErrors(fieldErrors);
      return;
    }
    const itemsPayload = prescriptions.map((p) => ({
      name: p.name,
      doseValue: Number(p.doseValue) || null,
      doseUnit: p.doseUnit,
      frequencyEvery: Number(p.frequencyEvery) || null,
      frequencyUnit: p.frequencyUnit,
      route: p.route,
      durationDays: Number(p.durationDays) || null,
      instructions: p.observations,
    }));

    await encounterMutate.mutateAsync({
      encounter: parsed.data, // usa dados validados do Zod
      prescriptionItems: itemsPayload,
    });

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
        enableResetScrollToCoords={false}>
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
          value={healthcareProvider}
          onChangeText={setHealthcareProvider}
          placeholder="Healthcare Provider (optional)"
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
          <PrescriptionItemCard 
            key={i}
            item={p}
            onEdit={() => {
              setEditingPrescription(i);
              setShowPrescriptionForm(true);
            }}
            onDelete={() => setPrescriptions(prescriptions.filter((_, idx) => idx !== i))}
          />
          // <View key={i} className="mt-2 rounded-md border border-[#2A3340] bg-[#1C1F26] p-3">
          //   <Text className="font-bold text-text">
          //     {p.medication} {p.doseValue}
          //     {p.doseUnit}
          //   </Text>
          //   <Text className="text-gray-400">
          //     {p.frequencyEvery} / {p.frequencyUnit}
          //   </Text>
          //   <Text className="text-gray-400">{p.durationDays} dias</Text>

          //   <View className="mt-2 flex-row gap-4">
          //     <TouchableOpacity
          //       onPress={() => {
          //         setEditingPrescription(i);
          //         setShowPrescriptionForm(true);
          //       }}>
          //       <Text className="text-blue-400">Edit</Text>
          //     </TouchableOpacity>

          //     <TouchableOpacity
          //       onPress={() => setPrescriptions(prescriptions.filter((_, idx) => idx !== i))}>
          //       <Text className="text-red-400">Delete</Text>
          //     </TouchableOpacity>
          //   </View>
          // </View>
        ))}

        <View className="mt-4 gap-3">
          <Button title="Add medication" onPress={() => setShowPrescriptionForm(true)} />
          <Button title="Import via OCR" onPress={mockOCR} />
        </View>

        <Button
          title={loading ? 'Saving...' : 'Save'}
          onPress={handleSave}
          disabled={loading}
          className="mt-6"
        />

        {vmError && <Text className="mt-2 text-sm text-red-400">{vmError}</Text>}
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
