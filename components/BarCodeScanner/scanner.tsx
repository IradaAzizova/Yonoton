import { CameraView, useCameraPermissions } from "expo-camera";
import { Pressable, Text, View, StyleSheet } from "react-native";

interface ScannerProps {
  setIsScanning: (value: boolean) => void;
  handleBarcodeScanned: (scanningResult: { data: string }) => void;
}

export default function Scanner({
  setIsScanning,
  handleBarcodeScanned,
}: ScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionBox}>
          <Text style={styles.permissionTitle}>Camera Permission</Text>

          <Text style={styles.permissionText}>
            This app needs camera access to scan barcodes.
          </Text>

          <View style={styles.permissionButtons}>
            <Pressable
              style={[styles.button, styles.denyButton]}
              onPress={() => setIsScanning(false)}
            >
              <Text>Deny</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.allowButton]}
              onPress={requestPermission}
            >
              <Text style={{color: 'white'}}>Allow</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay}>
          <Text style={styles.scanInstruction}>Center the barcode to scan</Text>
          <Pressable
            style={styles.cancelBtn}
            onPress={() => setIsScanning(false)}
          >
            <Text style={styles.buttonText}>Close Camera</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  middleRow: {
    flexDirection: "row",
    height: 250,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  viewfinder: {
    width: 280,
    backgroundColor: "transparent",
    position: "relative",
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    paddingTop: 40,
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00FF00",
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanInstruction: {
    color: "white",
    fontSize: 16,
    marginBottom: 30,
  },
  cancelBtn: {
    backgroundColor: "red",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  permissionBox: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },

  permissionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  permissionText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  permissionButtons: {
    flexDirection: "row",
    gap: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  denyButton: {
    backgroundColor: "#eee",
  },

  allowButton: {
    backgroundColor: "#007AFF",
  },
});
