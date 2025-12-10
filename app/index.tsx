import { getPlants } from "@/lib/api";
import { plantImages } from "@/lib/plantImages";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    getPlants().then(setPlants).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>

      {/* SECTION 1: ALL PLANTS */}
      <Text style={styles.sectionTitle}>Learn to Garden 🌱</Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/plant/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image
                source={plantImages[item.name]}
                style={{ width: 160, height: 160 }}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
                {!item.unlocked && (
                  <Text style={styles.locked}>🔒 Locked — Take quiz to unlock</Text>
                )}
                {item.unlocked && <Text style={styles.unlocked}>✨ Unlocked!</Text>}
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />

      {/* SECTION 2: UNLOCKED PLANTS */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Your Garden 🌸</Text>
      {plants.filter(p => p.unlocked).length === 0 && (
        <Text style={styles.empty}>You haven't unlocked any plants yet!</Text>
      )}

      <FlatList
        data={plants.filter(p => p.unlocked)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.gardenCard}>
            <Image
              source={plantImages[item.name]}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
            <Text style={styles.gardenName}>{item.name}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  img: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },

  cardTitle: { fontSize: 18, fontWeight: "600" },

  locked: { color: "#b33", fontSize: 12 },
  unlocked: { color: "#4CAF50", fontSize: 12 },

  empty: { fontSize: 14, color: "#777", marginBottom: 10 },

  gardenCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },

  gardenImg: { width: 60, height: 60, borderRadius: 10 },
  gardenName: { fontSize: 12, marginTop: 4 },
});


