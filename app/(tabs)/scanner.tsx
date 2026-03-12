import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { AppState, Linking, Platform, StyleSheet } from "react-native";
import { CameraView } from "expo-camera";
import { Overlay } from "./overlay";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match("/inactive|background/") &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
            if(data && !qrLock.current){
                          setTimeout(async () => {
                            await Linking.openURL(data);
                          }, 500);
            }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
