import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import plants from "../../data/plants";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plant = plants.find((p) => p.id.toString() === id);

  if (!plant) return <Text>Plant not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.description}>{plant.description}</Text>

      <Link href={`/plant/${id}/quiz`} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Take Quiz →</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20, color: "#444" },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 18, textAlign: "center" },
});
