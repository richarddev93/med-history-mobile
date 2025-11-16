import { useState } from 'react';
import { usePeopleStore } from '../store/usePeopleStore';
import { View, Text, TouchableOpacity, Platform, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePeopleVM } from '../vm/usePeopleVM';
import Screen from '@/components/ui/Screen';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Picker } from '@react-native-picker/picker';

export function PeopleFormScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [document, setDocument] = useState('');
  const [notes, setNotes] = useState('');

  const [linkType, setLinkType] = useState<string>('PARENT');
  const [isGuardian, setIsGuardian] = useState<boolean>(false);

  const { addPerson, loading } = usePeopleVM();
  const fetchPeople = usePeopleStore((s) => s.fetchPeople);

  const handleSave = async () => {
    await addPerson(
      {
        fullName,
        birthDate: birthDate ? birthDate.toISOString().slice(0, 10) : '',
        document,
        notes,
      },
      {
        type: linkType,
        isGuardian,
      }
    );
    await fetchPeople();
    navigation.goBack();
  };

  return (
    <Screen>
      {/* ---------- HEADER ---------- */}
      <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-lg text-blue-600">Cancelar</Text>
        </TouchableOpacity>

        <Text className="text-xl font-semibold text-white">Nova Pessoa</Text>

        {/* Placeholder p/ alinhar visualmente */}
        <View style={{ width: 60 }} />
      </View>

      {/* ---------- FORM ---------- */}
      <View className="p-4">
        <Input placeholder="Nome completo" value={fullName} onChangeText={setFullName} />

        {/* DATA */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View pointerEvents="none">
            <Input
              placeholder="Data de nascimento"
              value={birthDate ? birthDate.toLocaleDateString('pt-BR') : ''}
              onChangeText={() => {}}
            />
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_event: any, selectedDate: Date | undefined) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (selectedDate) setBirthDate(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}

        <Input placeholder="Documento" value={document} onChangeText={setDocument} />
        <Input placeholder="Observações" value={notes} onChangeText={setNotes} />

        {/* ---------- SELECT E CHECKBOX ---------- */}
        <Text className="mb-2 mt-4 text-sm text-gray-500">Tipo de vínculo</Text>

        <View className="mb-3 rounded-lg border border-gray-300">
          <Picker
            selectedValue={linkType}
            onValueChange={(itemValue) => setLinkType(itemValue)}
            mode="dropdown">
            <Picker.Item label="Pai / Mãe" value="PARENT" />
            <Picker.Item label="Filho(a)" value="CHILD" />
            <Picker.Item label="Cônjuge" value="SPOUSE" />
            <Picker.Item label="Responsável Legal" value="GUARDIAN" />
            <Picker.Item label="Outro" value="OTHER" />
          </Picker>
        </View>

        {/* CHECKBOX / SWITCH */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className=" text-text">É responsável?</Text>
          <Switch value={isGuardian} onValueChange={setIsGuardian} />
        </View>

        <Button
          title={loading ? 'Salvando...' : 'Salvar'}
          onPress={handleSave}
          disabled={loading}
        />
      </View>
    </Screen>
  );
}
