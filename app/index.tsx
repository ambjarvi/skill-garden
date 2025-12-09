import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import plants from "../data/plants";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn About Plants 🌱</Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={`/plant/${item.id}`}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.subtitle}>Tap to learn more</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f6fff5" },
  title: { fontSize: 28, fontWeight: "600", marginBottom: 20 },
  card: {
    padding: 16,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 20, fontWeight: "600" },
  subtitle: { fontSize: 14, color: "#555" },
});
