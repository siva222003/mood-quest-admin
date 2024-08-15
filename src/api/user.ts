import { api } from "../axios";

export const fetchUsers = async () => {
  const res = await api.get("/api/user/all");
  const data = await res.data;

  return data.data;
};
