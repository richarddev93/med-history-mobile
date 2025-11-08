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
  };
}