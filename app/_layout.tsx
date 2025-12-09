import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Home Screen */}
        <Stack.Screen
          name="index"
          options={{ title: 'Learn to Garden' }}
        />

        {/* Garden Screen */}
        <Stack.Screen
          name="garden"
          options={{ title: 'Your Garden' }}
        />

        {/* Plant Detail → /plant/[id] */}
        <Stack.Screen
          name="plant/[id]"
          options={{ title: 'Plant Details' }}
        />

        {/* Quiz → /plant/[id]/quiz */}
        <Stack.Screen
          name="plant/[id]/quiz"
          options={{ title: 'Quiz' }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

