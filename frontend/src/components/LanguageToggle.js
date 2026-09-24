import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

const OPTIONS = [
  { code: 'en', label: 'ENG' },
  { code: 'hi', label: 'हिंदी' },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <View style={styles.track}>
      {OPTIONS.map((opt) => {
        const active = opt.code === lang;
        return (
          <TouchableOpacity
            key={opt.code}
            onPress={() => setLang(opt.code)}
            activeOpacity={0.8}
            style={[styles.segment, active && styles.segmentActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.text, active && styles.textActive]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: '#F1F2F5',
    borderRadius: 999,
    padding: 2,
  },
  segment: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  segmentActive: { backgroundColor: colors.primary },
  text: { fontFamily: fonts.semibold, fontSize: 12, color: colors.textSecondary },
  textActive: { color: '#FFFFFF' },
});
