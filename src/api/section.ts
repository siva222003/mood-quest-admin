import { api } from "../axios";

export const fetchSections = async (questionnaireId: string | undefined) => {
  if (!questionnaireId) return;

  const res = await api.get(`/api/section/questionnaire/${questionnaireId}`);
  const data = await res.data;

  return data.data;
};

type SectionRequest = {
  sectionId?: string;
  questionnaireId?: string;
  name?: string;
};

export const createSection = async (section: SectionRequest) => {
  const res = await api.post(`/api/section/${section.questionnaireId}`, { name: section.name });
  const data = await res.data;

  return data.data;
};

export const updateSection = async ({ sectionId, name }: SectionRequest) => {
  const res = await api.patch(`/api/section/${sectionId}`, { name });
  const data = await res.data;

  return data.data;
};

export const deleteSection = async ({ sectionId, questionnaireId }: SectionRequest) => {
  const res = await api.delete(`/api/section/${sectionId}`, {
    data: { questionnaireId },
  });
  const data = await res.data;

  return data.data;
};
