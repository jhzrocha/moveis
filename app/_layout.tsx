import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Remove o cabeçalho de todas as páginas
      }}
    />
  );
}
