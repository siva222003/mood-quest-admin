import {
  createQuestionnaire,
  deleteQuestionnaire,
  fetchQuestionnaires,
  updateQuestionnaire,
} from "@/api/questionnaire";
import { Questionnaire } from "@/data/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export const useFetchQuestionnaires = () => {
  const {
    isLoading,
    data: questionnaires,
    isError,
    isSuccess,
  } = useQuery<Questionnaire[]>({
    queryKey: ["questionnaire"],
    queryFn: fetchQuestionnaires,
    refetchOnMount: false,
    retry: false,
  });

  return { questionnaires, isLoading, isError, isSuccess };
};

export const useCreateQuestionnaire = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createQuestionnaire,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to add new questionnaire",
        description: "An error occurred while adding the questionnaire",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questionnaire"] });
      toast({
        title: "Added new questionnaire",
        description: "The questionnaire has been added successfully",
      });
    },
  });

  return {
    mutate,
  };
};

export const useUpdateQuestionnaire = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateQuestionnaire,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to update questionnaire",
        description: "An error occurred while updating the questionnaire",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questionnaire"] });
      toast({
        title: "Updated questionnaire",
        description: "The questionnaire has been updated successfully",
      });
    },
  });

  return {
    mutate,
  };
};

export const useDeleteQuestionnaire = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteQuestionnaire,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to delete questionnaire",
        description: "An error occurred while deleting the questionnaire",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questionnaire"] });
      toast({
        title: "Deleted questionnaire",
        description: "The questionnaire has been deleted successfully",
      });
    },
  });

  return {
    mutate,
  };
};
