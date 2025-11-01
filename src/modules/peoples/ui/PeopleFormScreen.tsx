import { useState } from 'react'
import { View, Text } from 'react-native'
import { usePeopleVM } from '../vm/usePeopleVM'
import Screen from '@/components/ui/Screen';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
export function PeopleFormScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [document, setDocument] = useState('')
  const [notes, setNotes] = useState('')
  const { addPerson, loading } = usePeopleVM()

  const handleSave = async () => {
    await addPerson({ fullName, birthDate, document, notes })
    navigation.goBack()
  }

  return (
    <Screen>
      <View className="p-4">
        <Text className="text-2xl font-semibold mb-4">Nova Pessoa</Text>
        <Input placeholder="Nome completo" value={fullName} onChangeText={setFullName} />
        <Input placeholder="Data de nascimento" value={birthDate} onChangeText={setBirthDate} />
        <Input placeholder="Documento" value={document} onChangeText={setDocument} />
        <Input placeholder="Observações" value={notes} onChangeText={setNotes} />
        <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleSave} disabled={loading} />
      </View>
    </Screen>
  )
}
