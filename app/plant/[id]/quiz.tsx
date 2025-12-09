import { getQuiz, submitQuiz } from "@/lib/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuizStardew() {
  const { id } = useLocalSearchParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
      async function load() {
        try {
          const data = await getQuiz(String(id));
          setQuiz(data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
      load();
    }, [id]);
    // useEffect(() => {
    //   async function load() {
    //     console.log("➡ QuizScreen opened with id:", id);
  
    //     try {
    //       const quizData = await getQuiz(String(id));
    //       console.log("✔ Quiz loaded:", quizData);
    //       setQuiz(quizData);
    //     } catch (err: any) {
    //       console.log("❌ Error loading quiz:", err.message);
    //     }
    //   }
    //   load();
    // }, []);

  async function handleSubmit(index: number) {
    setSubmitting(true);
    setSelected(index);

    const result = await submitQuiz(String(id), index);
    const isCorrect = result.correct;

    setFeedback(isCorrect ? "Correct! 🌱" : "Try again! 🌧️");

    if (isCorrect) {
      setTimeout(() => router.push("/garden"), 1200);
    }

    setSubmitting(false);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading your garden wisdom...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header / Stardew-style banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Plant Knowledge Check</Text>
      </View>

      <Text style={styles.question}>{quiz.question}</Text>

      <View style={styles.optionsContainer}>
        {quiz.options.map((opt: string, idx: number) => {
          const isSelected = selected === idx;
          return (
            <TouchableOpacity
              key={idx}
              disabled={submitting}
              onPress={() => handleSubmit(idx)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3E8", // warm stardew parchment
    padding: 20,
    justifyContent: "flex-start",
  },
  banner: {
    backgroundColor: "#E2C799",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  bannerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5A4229",
    letterSpacing: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A3C2F",
    marginBottom: 24,
    textAlign: "center",
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: "#FFF8EE",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D8C9A5",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  optionSelected: {
    backgroundColor: "#DDEECC",
    borderColor: "#97B67C",
  },
  optionText: {
    fontSize: 18,
    color: "#5A4A36",
  },
  feedback: {
    marginTop: 22,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
    color: "#5A4A36",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F3E8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B5B4A",
  },
});

//   async function handleAnswer(i: number) {
//     const { correct } = await submitQuiz(String(id), i);

//     if (correct) {
//       Alert.alert("Correct!", "You unlocked this plant!", [
//         { text: "Go to Garden", onPress: () => router.push("/garden") },
//       ]);
//     } else {
//       Alert.alert("Try again", "That's not correct.");
//     }
//   }

//   if (!quiz) return <Text>Loading quiz...</Text>;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.question}>{quiz.question}</Text>

//       {quiz.options.map((option: string, index: number) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.option}
//           onPress={() => handleAnswer(index)}
//         >
//           <Text style={styles.optionText}>{option}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   question: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
//   option: {
//     backgroundColor: "#E7FBE7",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   optionText: { fontSize: 18 },
// });
