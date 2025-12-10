import { getPlants } from "@/lib/api";
import {
  plantImages
} from "@/lib/plantImages";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
export default function Garden() {
  const [unlockedPlants, setUnlockedPlants] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const plants = await getPlants();
      setUnlockedPlants(plants.filter((p: any) => p.unlocked));
    }
    load();
  }, []);

  if (unlockedPlants.length === 0)
    return <Text style={styles.empty}>No plants unlocked yet!</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={unlockedPlants}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={plantImages[item.name]}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  empty: { padding: 20, fontSize: 18 },
  card: {
    width: "48%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 10, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: "600" },
});
