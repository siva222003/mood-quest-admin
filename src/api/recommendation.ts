import { Recommendation } from "@/data/schema";
import { api } from "../axios";

export const fetchRecommendations = async () => {
  const res = await api.get("/api/recommendations");
  const data = await res.data;

  return data.data;
};

type RecommendationRequest = Omit<Recommendation, "_id" | "createdAt">;

export const createRecommendation = async (recommendation: RecommendationRequest) => {
  const res = await api.post("/api/recommendations", recommendation);
  const data = await res.data;

  return data.data;
};

export const updateRecommendation = async (recommendation: Recommendation) => {
  const res = await api.patch(`/api/recommendations/${recommendation._id}`, recommendation);
  const data = await res.data;

  return data.data;
};

export const deleteRecommendation = async (id: string) => {
  const res = await api.delete(`/api/recommendations/${id}`);
  const data = await res.data;

  return data.data;
};
