import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import LanguageToggle from './LanguageToggle';

/** "← Go back" on the left, ENG / हिंदी switch on the right. */
export default function ScreenHeader({ onBack }) {
  const { t } = useLanguage();
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onBack} style={styles.back} hitSlop={10} accessibilityRole="button">
        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        <Text style={styles.backText}>{t.goBack}</Text>
      </TouchableOpacity>
      <LanguageToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  back: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontFamily: fonts.medium, fontSize: 15, color: colors.textPrimary, marginLeft: 12 },
});
