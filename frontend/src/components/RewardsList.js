import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { formatINR } from '../utils/format';

// 1st = trophy, 2nd/3rd = medals, everything else = outlined star.
function positionIcon(position) {
  if (position === 1) return <Ionicons name="trophy" size={20} color={colors.gold} />;
  if (position === 2) return <Ionicons name="medal" size={20} color={colors.silver} />;
  if (position === 3) return <Ionicons name="medal" size={20} color={colors.bronze} />;
  return <Ionicons name="star-outline" size={20} color={colors.primary} />;
}

export default function RewardsList({ rewards }) {
  const { t } = useLanguage();
  if (!rewards?.length) return null;

  return (
    <Card>
      <View style={styles.headRow}>
        <Text style={styles.heading}>{t.rewards}</Text>
        <Text style={styles.sub}>{t.allPositions}</Text>
      </View>
      {rewards.map((r) => (
        <View key={r.position} style={styles.row}>
          <View style={styles.icon}>{positionIcon(r.position)}</View>
          <Text style={styles.label}>{t.winnerLabel(r.position)}</Text>
          <Text style={styles.amount}>{formatINR(r.amount)}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  headRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  heading: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.textPrimary },
  sub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginLeft: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 8,
    marginBottom: 3,
  },
  icon: { width: 30, alignItems: 'center' },
  label: { flex: 1, fontFamily: fonts.semibold, fontSize: 13, color: colors.textPrimary, marginLeft: 6 },
  amount: { fontFamily: fonts.semibold, fontSize: 16, color: colors.primary, marginRight: 8 },
});
