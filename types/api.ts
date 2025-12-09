import { Plant } from "./Plant";

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
