import { getPlants } from "@/lib/api";
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
              <Image source={{ uri: item.imageUrl }} style={styles.img} />
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
            <Image source={{ uri: item.imageUrl }} style={styles.gardenImg} />
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




// import { useEffect, useState } from "react";
// import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
// import { getPlants, unlockPlant } from "../lib/api";
// import { Plant } from "../types/Plant";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f6fff5",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "600",
//     marginBottom: 20,
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2, // Android shadow
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#555",
//   },
// });

// export default function Index() {
//   const [plants, setPlants] = useState<Plant[]>([]);

//   useEffect(() => {
//     loadPlants();
//   }, []);

//   async function loadPlants() {
//     const data = await getPlants();
//     setPlants(data);
//   }

//   async function handleUnlock(id: number) {
//     await unlockPlant(id);
//     loadPlants(); // refresh list
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
//         Your Plants
//       </Text>

//       <FlatList
//         data={plants}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card}>
//             <Image
//               source={{ uri: item.imageUrl }}
//               style={{ width: 80, height: 80, borderRadius: 10, marginRight: 12 }}
//             />
//             <View>
//               <Text style={styles.cardTitle}>{item.name}</Text>
//               <Text style={styles.subtitle}>Tap to learn more</Text>
//             </View>
//           </TouchableOpacity>


//         )}
//       />
//     </View>
//   );
// }
