import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

/** Placeholder for a future ad unit; renders the dashed "Ad Here" slot from the design. */
export default function AdSlot() {
  const { t } = useLanguage();
  return (
    <View style={styles.slot}>
      <Ionicons name="megaphone-outline" size={20} color={colors.textMuted} />
      <Text style={styles.text}>{t.adHere}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD2DA',
    borderRadius: 10,
    paddingVertical: 12,
  },
  text: { fontFamily: fonts.semibold, fontSize: 12, color: colors.textMuted, marginLeft: 10 },
});
