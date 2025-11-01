import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Ionicons } from '@expo/vector-icons';
import MedsListScreen from '@/modules/meds/ui/MedListScreen';
import {PeopleListScreen} from '@/modules/peoples/ui/PeopleScreen';
import { PeopleFormScreen } from '@/modules/peoples/ui/PeopleFormScreen';

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
      <Tab.Screen name="People" component={PeopleListScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="people" size={20} color={color} /> }} />
      <Tab.Screen name="PeopleForm" component={PeopleFormScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={20} color={color} /> }} />
      <Tab.Screen name="MedList" component={MedsListScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="medical" size={20} color={color} /> }} />
    </Tab.Navigator>
  );
}
