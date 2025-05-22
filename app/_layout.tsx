import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as LocalAuthentication from "expo-local-authentication";
import { Stack } from 'expo-router';
import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [hasBiometrics, setHasBiometrics] = useState(true);

  const checkDeviceForHardware = async () => {
      let compatible = await LocalAuthentication.hasHardwareAsync();
      if(compatible) {
        checkForBiometrics();
      } else {
        setHasBiometrics(false);
      }
  };

  const checkForBiometrics = async () => {
      let biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if(biometricRecords) {
        authenticate();
      } else {
        setHasBiometrics(false);
      }
    };

  const authenticate = async () => {
      let result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setAuthenticated(true);
      } else if (result.error == "user_cancel") {
        authenticate();
      }
  }
    
  if(!authenticated && hasBiometrics) {
    checkDeviceForHardware();
  }

  if(authenticated || !hasBiometrics) {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>            
          <Stack>      
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />      
            <Stack.Screen name="screens/settings" options={{ headerShown:false}} />
          </Stack>      
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}