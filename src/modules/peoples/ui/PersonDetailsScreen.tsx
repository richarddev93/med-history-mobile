
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { peoplesApi } from '../data/peoples.api';
import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';

export function PersonDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params as { personId: string };

  const { data: person, isLoading, error } = useQuery({
    queryKey: ['person', personId],
    queryFn: () => peoplesApi.getById(personId),
  });

  if (isLoading) {
    return (
      <Screen>
        <Text>Carregando...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Text>Ocorreu um erro ao buscar os detalhes da pessoa.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          source={{ uri: person?.avatarUrl || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{person?.name}</Text>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.value}>{person?.document}</Text>
        <Text style={styles.label}>Data de Nascimento</Text>
        <Text style={styles.value}>{person?.birthDate}</Text>
        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.value}>{person?.phone}</Text>
        <Text style={styles.label}>Plano de Saúde</Text>
        <Text style={styles.value}>{person?.healthPlan}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Editar"
            onPress={() => navigation.navigate('PeopleForm', { personId: person.id })}
          />
          <Button
            title="Excluir"
            onPress={() => {
              // Lógica de exclusão
            }}
            variant="destructive"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
