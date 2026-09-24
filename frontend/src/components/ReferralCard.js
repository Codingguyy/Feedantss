import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { notify } from '../utils/dialog';

/**
 * "Refer & Earn" card. The link is per-user and comes from the API
 * (`viewer.referralLink`); logged-out viewers are nudged to log in first.
 */
export default function ReferralCard({ link, rewardAmount, competitionTitle, onRequireLogin }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    if (!link) return onRequireLogin();
    try {
      await Clipboard.setStringAsync(link);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      notify(t.copyLink, link);
    }
  };

  const handleShare = async () => {
    if (!link) return onRequireLogin();
    try {
      await Share.share({ message: t.referShare(competitionTitle, link) });
    } catch (err) {
      // User dismissed the sheet or sharing is unsupported (some browsers) - fall back to copying.
      handleCopy();
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Ionicons name="megaphone" size={40} color={colors.primary} style={styles.megaphone} />
        <View style={styles.leftBody}>
          <Text style={styles.title}>{t.referTitle}</Text>
          <View style={styles.linkBox}>
            <Text style={[styles.link, !link && styles.linkPlaceholder]} numberOfLines={1}>
              {link || t.referLoginPrompt}
            </Text>
            <TouchableOpacity onPress={handleCopy} style={styles.copyBtn} accessibilityRole="button">
              <Text style={styles.copyText}>{copied ? t.copied : t.copyLink}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.referBtn} onPress={handleShare} activeOpacity={0.85} accessibilityRole="button">
          <Text style={styles.referText}>{t.referNow}</Text>
        </TouchableOpacity>
        <Text style={styles.earn}>{t.youEarn(rewardAmount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successMuted,
    borderRadius: 14,
    padding: 12,
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  megaphone: { marginRight: 8 },
  leftBody: { flex: 1 },
  title: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.textPrimary },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 6,
    overflow: 'hidden',
  },
  link: { flex: 1, fontFamily: fonts.regular, fontSize: 10.5, color: colors.textSecondary, paddingHorizontal: 8, paddingVertical: 8 },
  linkPlaceholder: { color: colors.textMuted },
  copyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    backgroundColor: '#F7FAFA',
  },
  copyText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.primaryDark },
  right: { width: 104, marginLeft: 10, alignItems: 'center' },
  referBtn: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  referText: { fontFamily: fonts.semibold, fontSize: 12, color: '#fff' },
  earn: { fontFamily: fonts.regular, fontSize: 10, lineHeight: 14, color: colors.textSecondary, marginTop: 6, textAlign: 'center' },
});
