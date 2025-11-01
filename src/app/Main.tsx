import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QueryProvider from './providers/QueryProvider';
import AppNavigator from '@/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigationRef } from '@/navigation/navigationRef';

export default function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <QueryProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </QueryProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
