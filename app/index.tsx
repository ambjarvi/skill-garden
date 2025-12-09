import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { getPlants, unlockPlant } from "../types/api";
import { Plant } from "../types/Plant";

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
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>
              {item.name} — {item.unlocked ? "🌱 Unlocked" : "🔒 Locked"}
            </Text>

            {!item.unlocked && (
              <Button title="Unlock" onPress={() => handleUnlock(item.id)} />
            )}
          </View>
        )}
      />
    </View>
  );
}
