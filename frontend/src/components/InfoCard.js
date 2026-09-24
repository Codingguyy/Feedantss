import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

/**
 * Label + big value pair ("Prize Pool / ₹ 1,500"). `accent` paints the value
 * in the brand colour and bumps its size; used for Prize Pool vs Entry Fee.
 */
export default function InfoCard({ label, value, accent, style }) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, accent && styles.accent]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary },
  value: { fontFamily: fonts.semibold, fontSize: 20, color: colors.textPrimary, marginTop: 2 },
  accent: { fontFamily: fonts.bold, fontSize: 27, color: colors.primary },
});
