import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: number;
}

export default function ProductCard({
  image,
  name,
  category,
  price,
}: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
      <View style={styles.textCont}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productCategory}>{category}</Text>
        <Text style={styles.productPrice}>${price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  productName: {
    fontSize: 17,
    fontWeight: 700,
  },
  productCategory: {
    color: "#707070",
  },
  productPrice: {
    color: "#188c19",
    fontWeight: 500,
  },
  textCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  }
});
