import { Question } from "@/data/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { createQuestion, deleteQuestion, fetchQuestions, updateQuestion } from "@/api/question";

export const useFetchQuestions = (sectionId: string | undefined) => {
  const {
    isLoading,
    data: questions,
    isError,
    isSuccess,
  } = useQuery<Question[]>({
    queryKey: ["questions", sectionId],
    queryFn: () => fetchQuestions(sectionId),
    retry: false,
  });

  return { questions, isLoading, isError, isSuccess };
};

export const useCreateQuestion = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestion,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to add new question",
        description: (err.response?.data as Error).message,
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questions"] });
      toast({
        title: "Added new question",
        description: "The question has been added successfully",
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useUpdateQuestion = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateQuestion,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to update question",
        description: (err.response?.data as Error).message,
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questions"] });
      toast({
        title: "Updated question",
        description: "The question has been updated successfully",
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useDeleteQuestion = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteQuestion,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to delete question",
        description: "An error occurred while deleting the question",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questions"] });
      toast({
        title: "Deleted question",
        description: "The question has been deleted successfully",
      });
    },
  });

  return {
    mutate,
  };
};
