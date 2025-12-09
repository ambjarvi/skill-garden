import { getPlant } from "@/lib/api";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const [plant, setPlant] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getPlant(Number(id));
      setPlant(data);
    }
    load();
  }, []);

  if (!plant) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: plant.imageUrl }} style={styles.image} />

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
  container: { padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  description: { fontSize: 16, color: "#444", marginBottom: 20 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontSize: 18, textAlign: "center" },
});
