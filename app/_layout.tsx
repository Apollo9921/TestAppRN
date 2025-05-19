import Tabs from "@/navigation/tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
        <Tabs />
    </SafeAreaProvider>
  );
}