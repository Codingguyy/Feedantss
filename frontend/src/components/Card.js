import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, shadow } from '../styles/theme';

/** White rounded surface used by every section on the details screen. */
export default function Card({ children, style, tone = 'default' }) {
  return <View style={[styles.card, tone === 'tint' && styles.tint, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    ...shadow.card,
  },
  tint: {
    backgroundColor: colors.primaryMuted,
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
});
