import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("https://my-plant-api.onrender.com/plants")
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Your Plants</Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ paddingVertical: 10 }}>
            {item.name} — {item.unlocked ? "🌱 Unlocked" : "🔒 Locked"}
          </Text>
        )}
      />
    </View>
  );
}
