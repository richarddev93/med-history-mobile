import LoginScreen from '@/modules/auth/ui/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={LoginScreen} />
    </Stack.Navigator>
  )
}
