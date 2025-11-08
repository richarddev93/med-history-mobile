import { useEncounterStore } from "../store/useEncountersStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { encountersApi } from "../data/encounters.api";
import { CreateEncounterData, ResponseEncounter, Encounter } from "../schemas/encounters.schema";
import { useEffect } from "react";


export const useEncounter = (personId: string) => {
  const { encounters, setEncounters, setLoading, loading } = useEncounterStore();
 const queryClient = useQueryClient();

  const encounterMutate = useMutation<ResponseEncounter, unknown, CreateEncounterData>({
    mutationFn: async (encounterData) => {
      const created = await encountersApi.createEncounter(encounterData);
      return created;
    },
    onSuccess: () => {
      console.log("Encounter created successfully");
      queryClient.invalidateQueries({ queryKey: ['encounters'] });
    },
    onError: (error) => {
      console.error("Error creating encounter:", error);
    },
  });

  const deleteMutation = useMutation<boolean, unknown, string>({
    mutationFn: async (id: string) => {
      return await encountersApi.deleteEncounter(id);
    },
    onMutate: async (id: string) => {
      // cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['encounters', personId] });
      const previous = queryClient.getQueryData<Encounter[]>(['encounters', personId]);

      // optimistically update cache and store
      if (previous) {
        const next = previous.filter((e) => e.id !== id);
        queryClient.setQueryData(['encounters', personId], next);
        setEncounters(next);
      }

      return { previous };
    },
    onError: (err, id, context: any) => {
      // rollback
      if (context?.previous) {
        queryClient.setQueryData(['encounters', personId], context.previous);
        setEncounters(context.previous as Encounter[]);
      }
      console.error('Error deleting encounter:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['encounters', personId] });
    },
  });

  const encounterQuery = useQuery({
    queryKey: ['encounters', personId],
    queryFn: () => encountersApi.getByPersonId(personId),
    enabled: !!personId,
  });

  // when react-query fetches data, save to store
  useEffect(() => {
    if (encounterQuery.data) {
      setEncounters(encounterQuery.data as Encounter[]);
    }
  }, [encounterQuery.data, setEncounters]);

  // keep loading flag in store in sync with react-query
  useEffect(() => {
    setLoading(!!encounterQuery.isFetching);
  }, [encounterQuery.isFetching, setLoading]);

  return {
    encounters,
    loading,
    encounterMutate,
    refetch: encounterQuery.refetch,
    deleteEncounter: (id: string) => {
      // call delete mutation (optimistic update handled in mutation)
      deleteMutation.mutate(id);
    },
  };
}