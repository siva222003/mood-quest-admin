import { SectionResponse } from "@/data/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { createSection, deleteSection, fetchSections, updateSection } from "@/api/section";

export const useFetchSections = (questionnaireId: string | undefined) => {
  const {
    isLoading,
    data: sections,
    isError,
    isSuccess,
  } = useQuery<SectionResponse>({
    queryKey: ["sections", questionnaireId],
    queryFn: () => fetchSections(questionnaireId),
    retry: false,
    refetchOnMount: false,
  });

  return { sections, isLoading, isError, isSuccess };
};

export const useCreateSection = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createSection,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to add new section",
        description: "An error occurred while adding the section",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["sections"] });
      toast({
        title: "Added new section",
        description: "The section has been added successfully",
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useUpdateSection = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateSection,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to update section",
        description: "An error occurred while updating the section",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["sections"] });
      toast({
        title: "Updated section",
        description: "The section has been updated successfully",
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useDeleteSection = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteSection,
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);

      toast({
        title: "Failed to delete section",
        description: "An error occurred while deleting the section",
      });
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["sections"] });
      toast({
        title: "Deleted section",
        description: "The section has been deleted successfully",
      });
    },
  });

  return {
    mutate,
  };
};
