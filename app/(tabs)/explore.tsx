import React, { useEffect, useState } from "react";
import { View, Text, Platform, Alert, StyleSheet, Linking } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function TabTwoScreen() {
const [locationPermission, setLocationPermission] =
  useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    if (Platform.OS === "ios") {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status);

        if (status !== "granted") {
          Alert.alert(
            "Location Permission Denied",
            "Please allow location access in settings",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open Settings",
                onPress: () => Linking.openSettings(),
              },
            ]
          );
        }
      })();
    }
  }, []);

  if (Platform.OS === "android") {
    return (
      <View style={styles.center}>
        <Text>Map is not available for android devices</Text>
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={locationPermission === "granted"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
