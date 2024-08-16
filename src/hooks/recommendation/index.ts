import { Recommendation } from "@/data/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  createRecommendation,
  deleteRecommendation,
  fetchRecommendations,
  updateRecommendation,
} from "@/api/recommendation";

export const useFetchRecommendations = () => {
  const {
    isLoading,
    data: recommendations,
    isError,
    isSuccess,
  } = useQuery<Recommendation[]>({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations,
    refetchOnMount: false,
    retry: false,
  });

  return { recommendations, isLoading, isError, isSuccess };
};

export const useCreateRecommendation = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createRecommendation,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to add new recommendation",
        description: "An error occurred while adding the recommendation",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["recommendations"] });
      toast({
        title: "Added new recommendation",
        description: "The recommendation has been added successfully",
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useUpdateRecommendation = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateRecommendation,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to update recommendation",
        description: "An error occurred while updating the recommendation",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["recommendations"] });
      toast({
        title: "Updated recommendation",
        description: "The recommendation has been updated successfully",
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useDeleteRecommendation = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteRecommendation,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to delete recommendation",
        description: "An error occurred while deleting the recommendation",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["recommendations"] });
      toast({
        title: "Deleted recommendation",
        description: "The recommendation has been deleted successfully",
      });
    },
  });

  return {
    mutate,
  };
};
