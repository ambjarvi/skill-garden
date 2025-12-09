import { getQuiz, submitQuiz } from "@/lib/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    async function load() {
      console.log("➡ QuizScreen opened with id:", id);

      try {
        const quizData = await getQuiz(String(id));
        console.log("✔ Quiz loaded:", quizData);
        setQuiz(quizData);
      } catch (err: any) {
        console.log("❌ Error loading quiz:", err.message);
      }
    }
    load();
  }, []);

  async function handleAnswer(i: number) {
    const { correct } = await submitQuiz(String(id), i);

    if (correct) {
      Alert.alert("Correct!", "You unlocked this plant!", [
        { text: "Go to Garden", onPress: () => router.push("/garden") },
      ]);
    } else {
      Alert.alert("Try again", "That's not correct.");
    }
  }

  if (!quiz) return <Text>Loading quiz...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{quiz.question}</Text>

      {quiz.options.map((option: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleAnswer(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
  option: {
    backgroundColor: "#E7FBE7",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: { fontSize: 18 },
});
