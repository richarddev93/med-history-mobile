import Reactotron from '@/lib/reactotron';
import { StateCreator } from 'zustand';

type WithReactotron = <T extends object>(config: StateCreator<T>, name?: string) => StateCreator<T>;

export const withReactotron: WithReactotron = (config, name = 'ZustandStore') => {
  return (set, get, store) => {
    // cria uma versão envolvida do set que loga as mudanças
    const wrappedSet: typeof set = (partial, replace, ...args) => {
      const prev = get();
      // ⚙️ chamada original (mantendo tipagem correta)
      set(partial as any, replace as any, ...args);
      const next = get();

      Reactotron.display({
        name,
        preview: Object.keys((partial as object) ?? {}).join(', ') || 'no changes',
        value: { prev, next },
      });
    };

    // retorna a store configurada, substituindo apenas o set
    return config(wrappedSet, get, store);
  };
};
