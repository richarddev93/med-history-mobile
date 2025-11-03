import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/modules/auth/ui/LoginScreen';
import MainTabs from './MainTabs';
import { useAuthStore } from '@/store/useAuthStore';
import SplashScreen from '@/modules/auth/ui/SplashScreen';
import { PeopleDetailScreen } from '@/modules/peoples/ui/PeopleDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const user = useAuthStore((s) => s.user);
  const isRestoring = useAuthStore((s) => s.isRestoring);

  if (isRestoring) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="PersonDetails" component={PeopleDetailScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
