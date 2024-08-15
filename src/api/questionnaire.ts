import { api } from "../axios";

export const fetchQuestionnaires = async () => {
  const res = await api.get("/api/questionnaire");
  const data = await res.data;

  return data.data;
};

type QuestionnaireRequest = {
  title: string;
};

export const createQuestionnaire = async (questionnaire: QuestionnaireRequest) => {
  const res = await api.post("/api/questionnaire", questionnaire);
  const data = await res.data;

  return data.data;
};

type UpdateQuestionnaireRequest = {
  id: string;
  title: string;
};

export const updateQuestionnaire = async ({ id, title }: UpdateQuestionnaireRequest) => {
  const res = await api.patch(`/api/questionnaire/${id}`, { title });
  const data = await res.data;

  return data.data;
};

export const deleteQuestionnaire = async (id: string) => {
  const res = await api.delete(`/api/questionnaire/${id}`);
  const data = await res.data;

  return data.data;
};
