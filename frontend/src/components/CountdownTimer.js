import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';

/**
 * Banner with a live "01d : 06h : 28m : 32s" countdown to `targetDate`.
 *
 * `serverTime` / `fetchedAt` give a clock offset so the countdown stays right
 * even if the device clock is wrong: we anchor to (server time at fetch) +
 * (local time elapsed since fetch) instead of trusting Date.now() alone.
 *
 * `onComplete` fires once when the target passes, so the screen can refetch
 * and pick up the next phase (e.g. registration just closed).
 */
export default function CountdownTimer({
  targetDate,
  serverTime,
  fetchedAt,
  label,
  hint, // right-hand nudge, e.g. "Hurry up!"; omit to hide
  onComplete,
}) {
  const offsetMs = useMemo(() => {
    if (!serverTime || !fetchedAt) return 0;
    return new Date(serverTime).getTime() - fetchedAt;
  }, [serverTime, fetchedAt]);

  const [now, setNow] = useState(() => Date.now() + offsetMs);

  useEffect(() => {
    setNow(Date.now() + offsetMs);
    const id = setInterval(() => setNow(Date.now() + offsetMs), 1000);
    return () => clearInterval(id);
  }, [offsetMs]);

  const diff = targetDate ? new Date(targetDate).getTime() - now : null;
  const isComplete = diff === null || diff <= 0;

  useEffect(() => {
    if (isComplete && targetDate && onComplete) onComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  if (!targetDate || isComplete) return null;

  const total = Math.floor(diff / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  const text = `${pad(Math.floor(total / 86400))}d : ${pad(Math.floor((total % 86400) / 3600))}h : ${pad(
    Math.floor((total % 3600) / 60)
  )}m : ${pad(total % 60)}s`;

  return (
    <View style={styles.banner}>
      <Ionicons name="hourglass-outline" size={20} color={colors.primaryDark} />
      <Text style={styles.label}>
        {label}
      </Text>
      <Text style={styles.time} numberOfLines={1}>{text}</Text>
      {!!hint && (
        <View style={styles.hint}>
          <Ionicons name="timer-outline" size={18} color={colors.primary} />
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryMuted,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  label: { flexShrink: 0, fontFamily: fonts.semibold, fontSize: 10.5, color: colors.textPrimary, marginLeft: 8 },
  time: {
    flexGrow: 1,
    flexShrink: 0,
    textAlign: 'center',
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    marginHorizontal: 4,
  },
  hint: { flexDirection: 'row', alignItems: 'center' },
  hintText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.primary, marginLeft: 4 },
});
