
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PrescriptionListScreen } from '../modules/prescriptions/ui/PrescriptionListScreen';
import { PrescriptionDetailsScreen } from '../modules/prescriptions/ui/PrescriptionDetailsScreen';
import { PrescriptionItemFormScreen } from '../modules/prescriptions/ui/PrescriptionItemFormScreen';

const Stack = createNativeStackNavigator();

export function PrescriptionNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PrescriptionList" component={PrescriptionListScreen} />
      <Stack.Screen name="PrescriptionDetails" component={PrescriptionDetailsScreen} />
      <Stack.Screen name="PrescriptionItemForm" component={PrescriptionItemFormScreen} />
    </Stack.Navigator>
  );
}
