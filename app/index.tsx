import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { getPlants, unlockPlant } from "../lib/api";
import { Plant } from "../types/Plant";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f6fff5",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Android shadow
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
});

export default function Index() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    loadPlants();
  }, []);

  async function loadPlants() {
    const data = await getPlants();
    setPlants(data);
  }

  async function handleUnlock(id: number) {
    await unlockPlant(id);
    loadPlants(); // refresh list
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Your Plants
      </Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 80, height: 80, borderRadius: 10, marginRight: 12 }}
            />
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.subtitle}>Tap to learn more</Text>
            </View>
          </TouchableOpacity>


        )}
      />
    </View>
  );
}
