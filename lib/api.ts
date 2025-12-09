import { Plant } from "../types/Plant";

const BASE_URL = "https://skill-garden-backend.onrender.com";

// ------------------------------
// PLANTS
// ------------------------------
export async function getPlants(): Promise<Plant[]> {
  const res = await fetch(`${BASE_URL}/plants`);
  if (!res.ok) throw new Error("Error loading plants");
  return res.json();
}

export async function unlockPlant(id: string) {
  const res = await fetch(`${BASE_URL}/unlock/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error unlocking plant");
  return res.json();
}

// ------------------------------
// GET SINGLE PLANT (LOCAL FILTER)
// ------------------------------
export async function getPlant(id: string) {
  const plants = await getPlants();
  return plants.find((p) => String(p.id) === String(id));
}

// ------------------------------
// QUIZ
// ------------------------------
export async function getQuiz(id: string) {
  const res = await fetch(`${BASE_URL}/quiz/${id}`);
  if (!res.ok) throw new Error("Could not load quiz");
  return res.json();
}

export async function submitQuiz(id: string, answerIndex: number) {
  const res = await fetch(`${BASE_URL}/quiz/${id}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answerIndex }),
  });
  if (!res.ok) throw new Error("Error submitting quiz");
  return res.json();
}