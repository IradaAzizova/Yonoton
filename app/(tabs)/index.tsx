import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Link, useRouter } from "expo-router";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        disabled={!isPermissionGranted}
        style={styles.topButton}
        onPress={() => router.push("/scanner")}
      >
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </Pressable>

      {/* <ScrollView style={styles.cards}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
            price={product.price}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",

    flex: 1,
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonStyle: {
    backgroundColor: 'black',
    color: 'white',
    width: 100,
    height: 100
  },
  cards: {
    marginTop: 40,
  },
  topButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    alignContent: "center",
    textAlignVertical: "center",
  },
});
