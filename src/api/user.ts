import { api } from "../axios";

export const fetchUsers = async () => {
  const res = await api.get("/api/user/all");
  const data = res.data;

  return data.data;
};

export const fetchUser = async () => {
  const res = await api.get(`/api/user`);
  const data = res.data;

  return data;
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const res = await api.post("/api/user/login", { email, password });
  const data = res.data;
  return data.data.token;
};
