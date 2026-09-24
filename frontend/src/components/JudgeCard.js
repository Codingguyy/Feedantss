import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Avatar from './Avatar';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

export default function JudgeCard({ judge, onPlayIntro }) {
  const { t } = useLanguage();
  if (!judge) return null;

  return (
    <Card>
      <View style={styles.row}>
        <Avatar uri={judge.photoUrl} name={judge.name} width={58} />
        <View style={styles.info}>
          <Text style={styles.kicker}>{t.judge}</Text>
          <Text style={styles.name}>{judge.name}</Text>
          {!!judge.title && <Text style={styles.sub}>{judge.title}</Text>}
          {!!judge.experience && <Text style={styles.sub}>{judge.experience}</Text>}
        </View>
        {!!judge.introVideoUrl && (
          <TouchableOpacity style={styles.video} onPress={onPlayIntro} activeOpacity={0.8} accessibilityRole="button">
            <View style={styles.playCircle}>
              <Ionicons name="play" size={18} color={colors.primary} style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.videoText}>{t.introVideo}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, marginLeft: 14 },
  kicker: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textSecondary },
  name: { fontFamily: fonts.semibold, fontSize: 15.5, color: colors.textPrimary, marginTop: 1 },
  sub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textSecondary, marginTop: 1 },
  video: { alignItems: 'center', marginLeft: 8 },
  playCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: { fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary, marginTop: 6 },
});
