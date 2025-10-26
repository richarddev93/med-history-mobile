import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/modules/auth/ui/LoginScreen';
import MainTabs from './MainTabs';
import { useAuthStore } from '@/store/useAuthStore';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const user = useAuthStore(s=> s.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
