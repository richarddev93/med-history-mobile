import Screen from '@/components/ui/Screen';
import { resetTo } from '@/navigation/navigationRef';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  const { restoreSession } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await restoreSession();
      const next = useAuthStore.getState().user ? 'Main' : 'Auth';
      resetTo(next);
    };

    init();
  }, []);

  return (
    <Screen scroll={false}>
      <ActivityIndicator size="large" color="#007AFF" />
    </Screen>
  );
}
