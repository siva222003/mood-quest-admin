import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const questionnaireSchema = z.object({
  _id: z.string(),
  title: z.string(),
  sections: z.array(z.string()),
  createdAt: z.string(),
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;

export type SectionResponse = {
  _id: string;
  title: string;
  sections: Section[];
};

export const sectionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  questions: z.array(z.string()),
  createdAt: z.string(),
});

export type Section = z.infer<typeof sectionSchema>;
