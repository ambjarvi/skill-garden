import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import plants from "../../../data/plants";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const plant = plants.find((p) => p.id.toString() === id);

  if (!plant) return <Text>Plant not found.</Text>;

  function handleFinishQuiz() {
    // TODO: connect to backend to store unlocked plant
    plant.unlocked = true; // temporary local version

    router.push("/garden");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz: {plant.name}</Text>
      <Text style={styles.question}>
        Placeholder question:  
        {"\n"}How much sunlight does this plant need?
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleFinishQuiz}>
        <Text style={styles.buttonText}>Finish Quiz & Unlock 🌱</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  question: { fontSize: 18, marginBottom: 30 },
  button: {
    backgroundColor: "#6BBF59",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
});
