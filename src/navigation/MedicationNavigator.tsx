
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersonMedicationListScreen } from '../modules/medications/ui/PersonMedicationListScreen';
import { MedicationFormScreen } from '../modules/medications/ui/MedicationFormScreen';

const Stack = createNativeStackNavigator();

export function MedicationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PersonMedicationList" component={PersonMedicationListScreen} />
      <Stack.Screen name="MedicationForm" component={MedicationFormScreen} />
    </Stack.Navigator>
  );
}
