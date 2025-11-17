import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { encountersApi } from '../data/encounters.api';
import { prescriptionsApi } from '@/modules/prescriptions/data/prescriptions.api';

import { Encounter, CreateEncounterData } from '../schemas/encounters.schema';
import { useEncounterStore } from '../store/useEncountersStore';

export const useEncounterVM = (personId: string) => {
  const { encounters, setEncounters, setLoading, loading } = useEncounterStore();
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);

  const encounterMutate = useMutation<
    any,
    unknown,
    { encounter: CreateEncounterData; prescriptionItems: any[] }
  >({
    mutationFn: async ({ encounter, prescriptionItems }) => {
      setError(null);

      const createdEncounter = await encountersApi.createEncounter(encounter);

      if (!createdEncounter) {
        throw new Error('Erro ao criar encounter');
      }

      if (!createdEncounter.Prescription?.length) {
        throw new Error('Nenhuma prescription retornada pelo backend');
      }

      const prescriptionId = createdEncounter.Prescription[0].id;
      console.log('Created prescription ID:', prescriptionItems);

      if (prescriptionItems.length > 0) {
        await prescriptionsApi.addItem(prescriptionId, prescriptionItems);
      }

      return createdEncounter;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['encounters', personId] });
    },

    onError: (err: any) => {
      const msg = err?.message ?? 'Erro desconhecido ao criar encounter';
      setError(msg);
    },
  });

  const deleteMutation = useMutation<boolean, unknown, string>({
    mutationFn: async (id: string) => {
      setError(null);
      return await encountersApi.deleteEncounter(id);
    },

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['encounters', personId] });
      const previous = queryClient.getQueryData<Encounter[]>(['encounters', personId]);

      if (previous) {
        const next = previous.filter((e) => e.id !== id);
        queryClient.setQueryData(['encounters', personId], next);
        setEncounters(next);
      }

      return { previous };
    },

    onError: (err, id, ctx: any) => {
      if (ctx?.previous) {
        queryClient.setQueryData(['encounters', personId], ctx.previous);
        setEncounters(ctx.previous as Encounter[]);
      }

      const msg = err instanceof Error ? err.message : 'Erro ao deletar encounter';
      setError(msg);
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

  useEffect(() => {
    if (encounterQuery.data) {
      setEncounters(encounterQuery.data as Encounter[]);
    }
  }, [encounterQuery.data]);

  useEffect(() => {
    setLoading(encounterQuery.isFetching);
  }, [encounterQuery.isFetching]);

  return {
    encounters,
    loading,
    error,
    encounterMutate,
    deleteEncounter: (id: string) => deleteMutation.mutate(id),
    refetch: encounterQuery.refetch,
  };
};
