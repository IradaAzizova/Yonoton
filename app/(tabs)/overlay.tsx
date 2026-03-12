import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const scanSize = width * 0.7;

export function Overlay() {
  return (
    <View style={styles.container}>
      <View style={styles.top} />

      <View style={styles.middle}>
        <View style={styles.side} />
        <View style={styles.scanArea} />
        <View style={styles.side} />
      </View>

      <View style={styles.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  top: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  middle: {
    flexDirection: "row",
  },

  side: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  scanArea: {
    width: scanSize,
    height: scanSize,
    borderWidth: 2,
    borderColor: "#00FFAA",
    backgroundColor: "transparent",
  },

  bottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
