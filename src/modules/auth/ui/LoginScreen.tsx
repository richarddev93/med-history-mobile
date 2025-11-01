import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useAuthVM } from '../vm/useAuthVM';
import Screen from '@/components/ui/Screen';
import Button from '@/components/ui/Button';

export default function LoginScreen() {
  const vm = useAuthVM();

  return (
    <Screen className="px-8 justify-center" scroll={false}>
      <View className="mb-8 items-center">
        <Image
          source={require('../../../../assets/logo_horizontal.png')}
          className="h-40 w-40"
          resizeMode="cover"
        />
      </View>

      {/* Title */}
      <View className="mb-8 items-center">
        <Text className="mb-1 text-3xl font-bold text-white">Welcome Back</Text>
        <Text className="text-sm text-muted">Sign in to access your medical history</Text>
      </View>

      {/* Form */}
      <View className="gap-4">
        <View>
          <Text className="mb-1 text-muted">Email</Text>
          <TextInput
            className="rounded-md border border-surface bg-card px-3 py-3 text-text"
            placeholder="Enter your email"
            placeholderTextColor="#95A5A6"
            value={vm.email}
            onChangeText={vm.setEmail}
          />
        </View>

        <View>
          <Text className="mb-1 text-muted">Password</Text>
          <TextInput
            className="rounded-md border border-surface bg-card px-3 py-3 text-text"
            placeholder="Enter your password"
            placeholderTextColor="#95A5A6"
            secureTextEntry={false}
            value={vm.password}
            onChangeText={vm.setPassword}
          />
          <TouchableOpacity className="mt-2">
            <Text className="text-right text-sm text-primary">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Action */}
      <View className="mt-6">
        <Button
          title="Sign In"
          onPress={vm.handleLogin}
          disabled={!vm.canSubmit || vm.loading}
          className="bg-primary"
          loading={vm.loading}
        />
      </View>

      {/* Divider */}
      <View className="my-6 flex-row items-center">
        <View className="h-[1px] flex-1 bg-secondary" />
        <Text className="mx-3 text-muted">OR</Text>
        <View className="h-[1px] flex-1 bg-secondary" />
      </View>

      {/* Social Logins */}
      <View className="gap-3">
        <Button title="Continue with Google" className="border border-surface bg-secondary" />
        <Button title="Continue with Apple" className="border border-surface bg-secondary" />
      </View>
    </Screen>
  );
}
