import { useState } from 'react';
import { peoplesApi } from '../data/peoples.api';
import { CreatePersonData, CreateUserPersonLinkData } from '@/schemas/peoples.schema';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';

type CreatePersonWithLinkData = {
  person: CreatePersonData;
  link: CreateUserPersonLinkData;
};
export function usePeopleVM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLink, setHasLink] = useState<boolean | null>(null);
  const { user } = useAuthStore();

  const personMutation = useMutation({
    mutationFn: async ({ person, link }: CreatePersonWithLinkData) => {
      if (!user) throw new Error('Usuário não autenticado');

      const personResponse = await peoplesApi.create(person);
      const personId = personResponse?.id;

      try {
        const linkPayload: CreateUserPersonLinkData = {
          personId,
          type: link.type,
          isGuardian: link.isGuardian,
        };

        const linkResponse = await peoplesApi.link(user.id, linkPayload);
        if (linkResponse.status === 201) setHasLink(true);
      } catch (error) {
        console.error('Erro ao criar link:', error);
        setHasLink(false);
      }

      return person; // retorna só a pessoa para o front
    },

    onError: (e: any) => {
      if (e instanceof Error) setError(e.message);
      else setError('Erro desconhecido ao adicionar pessoa');
    },

    onSettled: () => {
      setLoading(false);
    },
  });

  const addPerson = async (data: CreatePersonData, dataLink: CreateUserPersonLinkData) => {
    try {
      setLoading(true);
      setError(null);
      personMutation.mutate({ person: data, link: dataLink });
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError('Erro desconhecido ao adicionar pessoa');
    } finally {
      setLoading(false);
    }
  };

  return { addPerson, loading, error, hasLink };
}
