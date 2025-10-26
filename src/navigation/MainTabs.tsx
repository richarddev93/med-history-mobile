import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Ionicons } from '@expo/vector-icons';
import MedsListScreen from '@/modules/auth/meds/ui/MedListScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0B1220', borderTopColor: '#121A2A' },
        tabBarActiveTintColor: '#2F80ED',
      }}
    >
      <Tab.Screen name="People" component={MedsListScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="people" size={20} color={color} /> }} />
    </Tab.Navigator>
  );
}
