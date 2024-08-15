import { Question } from "@/data/schema";
import { api } from "../axios";

export const fetchQuestions = async (sectionId: string | undefined) => {
  if (!sectionId) return;

  const res = await api.get(`/api/question/section/${sectionId}`);
  const data = await res.data;

  return data.data;
};

type QuestionRequest = {
  sectionId?: string;
  questionId?: string;
  question?: Partial<Question>;
};

export const createQuestion = async ({ sectionId, question }: QuestionRequest) => {
  const res = await api.post(`/api/question`, { sectionId, question });
  const data = await res.data;

  return data.data;
};

export const updateQuestion = async ({ questionId, question }: QuestionRequest) => {
  const res = await api.patch(`/api/question/${questionId}`, { question });
  const data = await res.data;

  return data.data;
};

export const deleteQuestion = async ({ sectionId, questionId }: QuestionRequest) => {
  const res = await api.delete(`/api/question/${questionId}`, {
    data: { sectionId },
  });
  const data = await res.data;

  return data.data;
};
