import { useState } from 'react'
import { usePeopleStore } from '../store/usePeopleStore'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePeopleVM } from '../vm/usePeopleVM'
import Screen from '@/components/ui/Screen';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
export function PeopleFormScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [document, setDocument] = useState('')
  const [notes, setNotes] = useState('')
  const { addPerson, loading } = usePeopleVM()
  const fetchPeople = usePeopleStore((s) => s.fetchPeople)

  const handleSave = async () => {
    await addPerson({
      fullName,
      birthDate: birthDate ? birthDate.toISOString().slice(0, 10) : '',
      document,
      notes
    })
    await fetchPeople();
    navigation.goBack()
  }

  return (
    <Screen>
      <View className="p-4">
        <Text className="text-2xl font-semibold mb-4">Nova Pessoa</Text>
        <Input placeholder="Nome completo" value={fullName} onChangeText={setFullName} />
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
        <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleSave} disabled={loading} />
      </View>
    </Screen>
  )
}
