import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { products } from "@/api/data";
import ProductCard from "@/components/productCard";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Scanner from "@/components/BarCodeScanner/scanner";

export default function HomeScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleBarcodeScanned = (scanningResult: { data: string }) => {
    setIsScanning(false);
    const scannedData = scanningResult.data;

    const foundProduct = products.find((p) => p.productEan === scannedData);

    if (foundProduct) {
      Alert.alert("Scan was successful");
    } else {
      Alert.alert("Not Found", ``, [
        { text: "Try Again", onPress: () => setIsScanning(true) },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  const handleFavorites = (productId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  if (isScanning) {
    return (
      <Scanner
        setIsScanning={setIsScanning}
        handleBarcodeScanned={handleBarcodeScanned}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.topButton} onPress={() => setIsScanning(true)}>
        <Ionicons name="camera-sharp" color="#fff" size={24} />
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </Pressable>

      <ScrollView style={styles.cards}>
        {products.map((product) => (
          <View key={product.id} style={styles.productView}>
            <ProductCard
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
            />
            {favorites.includes(product.id) ? (
              <AntDesign
                name="heart"
                color="#000"
                size={24}
                onPress={() => handleFavorites(product.id)}
              />
            ) : (
              <Pressable>
                <Feather
                  name="heart"
                  color="#000"
                  size={24}
                  onPress={() => handleFavorites(product.id)}
                />
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 25,
    backgroundColor: "#F8F9FA",
  },
  productView: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  topButton: {
    backgroundColor: "black",
    paddingVertical: 18,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  cards: {
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 1,
  },
});
