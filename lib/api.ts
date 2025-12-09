import { Plant } from "../types/Plant";

const BASE_URL = "https://skill-garden-backend.onrender.com";

export async function getPlants(): Promise<Plant[]> {
  const res = await fetch(`${BASE_URL}/plants`);
  return res.json();
}

export async function unlockPlant(id: number): Promise<Plant> {
  const res = await fetch(`${BASE_URL}/unlock/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function getPlant(id: number) {
  const plants = await getPlants();
  return plants.find((p: any) => p.id === id);
}

export async function getQuiz(id: number) {
  const res = await fetch(`${BASE_URL}/quiz/${id}`);
  return res.json();
}

export async function submitQuiz(id: number, answerIndex: number) {
  const res = await fetch(`${BASE_URL}/quiz/${id}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answerIndex }),
  });
  return res.json();
}

