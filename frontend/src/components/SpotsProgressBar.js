import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

/** "👥 Only 19 spots left" + progress bar + "1 / 20 Booked". */
export default function SpotsProgressBar({ current, max, spotsRemaining, isAlmostFull, style }) {
  const { t } = useLanguage();
  const ratio = max > 0 ? Math.min(current / max, 1) : 0;
  const soldOut = spotsRemaining <= 0;
  const accent = soldOut ? colors.danger : isAlmostFull ? colors.warning : colors.primary;

  return (
    <View style={style}>
      <View style={styles.titleRow}>
        <Ionicons name="people-outline" size={18} color={accent} />
        <Text style={[styles.title, { color: accent }]} numberOfLines={1}>
          {soldOut ? t.soldOut : t.spotsLeft(spotsRemaining)}
        </Text>
      </View>
      <View style={styles.track}>
        {/* Keep a sliver of fill visible for non-zero counts so 1/20 still reads as "started". */}
        <View
          style={[
            styles.fill,
            { width: `${Math.max(ratio * 100, current > 0 ? 6 : 0)}%`, backgroundColor: accent },
          ]}
        />
      </View>
      <Text style={styles.booked}>{t.booked(current, max)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontFamily: fonts.medium, fontSize: 13.5, marginLeft: 6, flexShrink: 1 },
  track: {
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.primaryTrack,
    overflow: 'hidden',
    marginTop: 8,
  },
  fill: { height: '100%', borderRadius: 999 },
  booked: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginTop: 6 },
});
