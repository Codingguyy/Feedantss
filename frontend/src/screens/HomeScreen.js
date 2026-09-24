import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CompetitionCard from '../components/CompetitionCard';
import { fetchCompetitions } from '../services/api';
import { colors, spacing, typography } from '../styles/theme';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const data = await fetchCompetitions();
      setCompetitions(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh every time the screen comes back into focus (e.g. after
  // registering on the details screen and navigating back), so spot counts
  // don't look stale.
  useFocusEffect(
    useCallback(() => {
      load({ silent: true });
    }, [load])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load({ silent: true });
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorTitle}>Couldn&apos;t load competitions</Text>
        <Text style={styles.errorSubtitle}>{error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        data={competitions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        ListHeaderComponent={<Text style={styles.header}>Competitions</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No competitions live right now.</Text>}
        renderItem={({ item }) => (
          <CompetitionCard
            competition={item}
            onPress={() => navigation.navigate('CompetitionDetails', { competitionId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  listContent: { padding: spacing.lg },
  header: { ...typography.h1, color: colors.textPrimary, marginBottom: spacing.lg },
  empty: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
  errorTitle: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.xs },
  errorSubtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
