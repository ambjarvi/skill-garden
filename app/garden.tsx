import { StyleSheet, Text, View } from "react-native";
import plants from "../data/plants";

export default function GardenScreen() {
  // Placeholder unlocked plants
  const unlocked = plants.filter((p) => p.unlocked);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Garden 🌿</Text>

      {unlocked.length === 0 ? (
        <Text style={styles.subtitle}>
          Take quizzes to unlock plants in your garden!
        </Text>
      ) : (
        unlocked.map((plant) => (
          <Text key={plant.id} style={styles.plantItem}>
            🌱 {plant.name}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "600", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555" },
  plantItem: { fontSize: 20, marginVertical: 6 },
});
