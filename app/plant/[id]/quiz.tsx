import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BASE_URL = "https://skill-garden-backend.onrender.com";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/quiz/${id}`)
      .then(res => res.json())
      .then(data => setQuiz(data))
      .catch(err => console.error(err));
  }, []);

  async function submitAnswer(answerIndex: number) {
    const res = await fetch(`${BASE_URL}/quiz/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerIndex }),
    });
    const data = await res.json();

    if (data.correct) {
      Alert.alert("Correct!", "You unlocked this plant!", [
        { text: "Go to Garden", onPress: () => router.push("/garden") }
      ]);
    } else {
      Alert.alert("Try again", "That's not the correct answer.");
    }
  }

  if (!quiz) return <Text style={{ padding: 20 }}>Loading quiz...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{quiz.question}</Text>

      {quiz.options.map((opt: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => submitAnswer(index)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { fontSize: 24, marginBottom: 20, fontWeight: "600" },
  option: {
    padding: 15,
    backgroundColor: "#E7FBE7",
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: { fontSize: 18 }
});
