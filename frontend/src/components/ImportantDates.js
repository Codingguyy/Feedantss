import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { formatShortDate, formatTime } from '../utils/format';

/**
 * 2x2 grid of key dates. Mapping to the API fields:
 *   Register Before   -> registrationEndDate
 *   Submission Starts -> competitionStartDate
 *   Submission Ends   -> competitionEndDate
 *   Result Date       -> resultDate (optional; "To be announced" if unset)
 */
export default function ImportantDates({ data }) {
  const { t } = useLanguage();

  const items = [
    { key: 'reg', label: t.registerBefore, value: data.registrationEndDate, icon: <Ionicons name="calendar-outline" size={28} color={colors.primary} /> },
    { key: 'start', label: t.submissionStarts, value: data.competitionStartDate, icon: <Ionicons name="paper-plane-outline" size={28} color={colors.primary} /> },
    { key: 'end', label: t.submissionEnds, value: data.competitionEndDate, icon: <MaterialCommunityIcons name="tray-arrow-up" size={30} color={colors.primary} /> },
    { key: 'result', label: t.resultDate, value: data.resultDate, icon: <Ionicons name="trophy-outline" size={28} color={colors.primary} /> },
  ];

  return (
    <Card>
      <Text style={styles.heading}>{t.importantDates}</Text>
      <View style={styles.grid}>
        {items.map((item, idx) => (
          <View
            key={item.key}
            style={[styles.cell, idx % 2 === 0 && styles.cellRightBorder, idx < 2 && styles.cellBottomBorder]}
          >
            <View style={styles.icon}>{item.icon}</View>
            <View style={styles.cellText}>
              <Text style={styles.label}>{item.label}</Text>
              {item.value ? (
                <>
                  <Text style={styles.value}>{formatShortDate(item.value)}</Text>
                  <Text style={styles.value}>{formatTime(item.value)}</Text>
                </>
              ) : (
                <Text style={styles.tba}>{t.tba}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.textPrimary, marginBottom: 10 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cell: { width: '50%', flexDirection: 'row', alignItems: 'flex-start', padding: 12 },
  cellRightBorder: { borderRightWidth: 1, borderRightColor: colors.border },
  cellBottomBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  icon: { width: 34, alignItems: 'center', paddingTop: 6 },
  cellText: { flex: 1, marginLeft: 8 },
  label: { fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary },
  value: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 19, color: colors.textPrimary },
  tba: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted, marginTop: 4 },
});
