import storage from '@/storage/storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as LocalAuthentication from "expo-local-authentication";
import { Stack } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(true); 
  const [isEnabledBiometric, setIsEnabledBiometric] = useState(false);
  const [biometricStateLoaded, setBiometricStateLoaded] = useState(false);

  const isEnabledBiometricRef = useRef(isEnabledBiometric);
  useEffect(() => {
    isEnabledBiometricRef.current = isEnabledBiometric;
  }, [isEnabledBiometric]);

  const authenticate = useCallback(async () => {
    let result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setAuthenticated(true);
    } else if (result.error === "user_cancel") {
      authenticate();
    } else {
      setIsBiometricsAvailable(false);
      setAuthenticated(true);
    }
  }, []);

  const checkForBiometrics = useCallback(async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if(biometricRecords) {
      if(isEnabledBiometricRef.current) {
        authenticate();
      } else {
        setIsBiometricsAvailable(false);
        setAuthenticated(true);
      }
    } else {
      setIsBiometricsAvailable(false);
      setAuthenticated(true);
    }
  }, [authenticate]);

  const checkDeviceForHardware = useCallback(async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if(compatible) {
      checkForBiometrics();
    } else {
      setIsBiometricsAvailable(false);
      setAuthenticated(true);
    }
  }, [checkForBiometrics]);

  useEffect(() => {
    storage.load({
      key: 'biometricState',
      id: '0'
    })
    .then(ret => {
      setIsEnabledBiometric(ret.isActive);
      setBiometricStateLoaded(true);
    })
    .catch(err => {
      setIsEnabledBiometric(false);
      setIsBiometricsAvailable(false);
      setBiometricStateLoaded(true);
      setAuthenticated(true);
    });
  }, []);

  useEffect(() => {
    if (biometricStateLoaded) {
      if (!authenticated && isBiometricsAvailable && isEnabledBiometric) {
        checkDeviceForHardware();
      }
      else if (!authenticated && (!isBiometricsAvailable || !isEnabledBiometric)) {
        setAuthenticated(true);
      }
    }
  }, [authenticated, isBiometricsAvailable, isEnabledBiometric, biometricStateLoaded, checkDeviceForHardware]);

  if (authenticated || !isBiometricsAvailable) {
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