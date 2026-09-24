import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

export default function DisclaimerBanner({ text }) {
  const { t } = useLanguage();
  return (
    <View style={styles.banner}>
      <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
      <Text style={styles.text}>
        <Text style={styles.label}>{t.disclaimerLabel} </Text>
        {text || t.disclaimerDefault}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryMuted,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  text: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, lineHeight: 17, color: colors.textSecondary, marginLeft: 10 },
  label: { fontFamily: fonts.semibold, color: colors.primary },
});
