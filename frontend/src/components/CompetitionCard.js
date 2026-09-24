import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import StatusBadge from './StatusBadge';
import { colors, fonts, radii, spacing, typography } from '../styles/theme';

export default function CompetitionCard({ competition, onPress }) {
  const spotsLabel =
    competition.spotsRemaining > 0
      ? `${competition.spotsRemaining} spot${competition.spotsRemaining === 1 ? '' : 's'} left`
      : 'Full';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {!!competition.bannerImageUrl && (
        <Image source={{ uri: competition.bannerImageUrl }} style={styles.banner} resizeMode="cover" />
      )}
      <View style={styles.body}>
        <View style={styles.topRow}>
          <StatusBadge phase={competition.phase} />
          <Text style={styles.category}>{competition.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {competition.title}
        </Text>
        <Text style={styles.host}>{competition.hostName}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.prize}>₹{competition.prizePool.toLocaleString()} prize pool</Text>
          <Text
            style={[styles.spots, competition.isAlmostFull && { color: colors.warning }]}
          >
            {spotsLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  banner: { width: '100%', height: 130, backgroundColor: colors.surfaceAlt },
  body: { padding: spacing.md },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { ...typography.caption, color: colors.textMuted },
  title: { ...typography.h2, color: colors.textPrimary, marginTop: spacing.sm },
  host: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  prize: { ...typography.caption, fontFamily: fonts.semibold, color: colors.primary },
  spots: { ...typography.caption, color: colors.textSecondary },
});
