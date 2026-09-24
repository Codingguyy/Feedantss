import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PHASE_META, colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Top-right pill on the header card.
 *  - registered viewer  -> "✔ Registered" (tappable when `onPress` is given,
 *                          used to open the withdraw confirmation)
 *  - everyone else      -> the competition's lifecycle phase
 */
export default function StatusBadge({ phase, registered = false, onPress }) {
  const { t } = useLanguage();

  if (registered) {
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
      <Wrapper
        style={styles.registered}
        {...(onPress ? { onPress, activeOpacity: 0.8, accessibilityRole: 'button' } : {})}
      >
        <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
        <Text style={styles.registeredText}>{t.registered}</Text>
      </Wrapper>
    );
  }

  const meta = PHASE_META[phase] || PHASE_META.UPCOMING;
  return (
    <View style={[styles.phase, { backgroundColor: meta.bg }]}>
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text style={[styles.phaseText, { color: meta.color }]}>{t[meta.labelKey]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  registered: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryMuted,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  registeredText: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.primaryDark, marginLeft: 6 },
  phase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  phaseText: { fontFamily: fonts.semibold, fontSize: 11.5 },
});
