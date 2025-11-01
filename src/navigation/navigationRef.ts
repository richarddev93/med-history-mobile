import { createNavigationContainerRef, StackActions } from '@react-navigation/native'
import { RootStackParamList } from './types'

// cria a ref global com tipagem do stack
export const navigationRef = createNavigationContainerRef<RootStackParamList>()

// Sobrecarga 1 — rota sem params obrigatórios
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName
): void

// Sobrecarga 2 — rota com params obrigatórios
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params: RootStackParamList[RouteName]
): void

// Implementação genérica (sem erro)
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    // @ts-expect-error – necessário porque o tipo condicional de navigate é complexo
    navigationRef.navigate(name, params)
  }
}

// reset (sem params)
export function resetTo<RouteName extends keyof RootStackParamList>(name: RouteName) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name }],
    })
  }
}

// push com suporte a params
export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params))
  }
}
