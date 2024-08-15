import { fetchUsers } from "@/api/user";
import { User } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = () => {
  const {
    isLoading,
    data: users,
    isError,
    isSuccess,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnMount: false,
    retry: false,
  });

  return { users, isLoading, isError, isSuccess };
};
