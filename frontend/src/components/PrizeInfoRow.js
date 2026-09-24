import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

/** "How will you receive prize money?" video tile + refund policy / Razorpay trust line. */
export default function PrizeInfoRow({ videoUrl, refundPolicyUrl, onOpenUrl }) {
  const { t } = useLanguage();

  return (
    <Card style={styles.card}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => onOpenUrl(videoUrl)}
        disabled={!videoUrl}
        activeOpacity={0.8}
        accessibilityRole="button"
      >
        <View style={styles.playTile}>
          <View style={styles.playCircle}>
            <Ionicons name="play" size={16} color="#fff" style={{ marginLeft: 2 }} />
          </View>
        </View>
        <View style={styles.leftText}>
          <Text style={styles.title}>{t.howReceivePrize}</Text>
          <Text style={styles.sub}>{t.watchVideo}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.right}>
        <TouchableOpacity
          style={styles.line}
          onPress={() => onOpenUrl(refundPolicyUrl)}
          disabled={!refundPolicyUrl}
          accessibilityRole="link"
        >
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.textPrimary} />
          <Text style={styles.lineText}>{t.refundPolicy}</Text>
        </TouchableOpacity>
        <View style={[styles.line, { marginTop: 8 }]}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.textPrimary} />
          <Text style={styles.lineText} numberOfLines={2}>
            {t.securePayments} <Text style={styles.razorpay}>Razorpay</Text>
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  playTile: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#CFE9E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftText: { flex: 1, marginLeft: 10, marginRight: 6 },
  title: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 17, color: colors.textPrimary },
  sub: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textSecondary, marginTop: 3 },
  right: { flex: 1, paddingLeft: 8 },
  line: { flexDirection: 'row', alignItems: 'center' },
  lineText: { flex: 1, fontFamily: fonts.regular, fontSize: 11, lineHeight: 15, color: colors.textPrimary, marginLeft: 8 },
  razorpay: { fontFamily: fonts.bold, fontStyle: 'italic', color: colors.razorpay },
});
