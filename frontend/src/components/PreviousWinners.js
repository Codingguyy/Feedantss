import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Avatar from './Avatar';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

/** Horizontally scrolling strip; tapping a winner opens their performance video. */
export default function PreviousWinners({ winners, onPlayVideo }) {
  const { t } = useLanguage();
  if (!winners?.length) return null;

  return (
    <Card style={styles.card}>
      <Text style={styles.heading}>{t.previousWinners}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {winners.map((w, idx) => (
          <TouchableOpacity
            key={`${w.name}-${idx}`}
            style={styles.item}
            activeOpacity={0.85}
            disabled={!w.videoUrl}
            onPress={() => onPlayVideo?.(w.videoUrl)}
            accessibilityRole={w.videoUrl ? 'button' : undefined}
          >
            <Avatar uri={w.photoUrl} name={w.name} width={50} height={54} radius={8}>
              {!!w.videoUrl && (
                <View style={styles.playBadge}>
                  <Ionicons name="play" size={9} color="#fff" style={{ marginLeft: 1 }} />
                </View>
              )}
            </Avatar>
            <View style={styles.text}>
              <Text style={styles.name} numberOfLines={1}>
                {w.name}
              </Text>
              <Text style={styles.position}>{t.winnerLabel(w.position)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { paddingRight: 0 },
  heading: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.textPrimary, marginBottom: 10 },
  list: { paddingRight: 14 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    minWidth: 138,
  },
  playBadge: {
    position: 'absolute',
    right: 3,
    bottom: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 1.5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { marginLeft: 8, marginRight: 8, flexShrink: 1 },
  name: { fontFamily: fonts.medium, fontSize: 12, color: colors.textPrimary },
  position: { fontFamily: fonts.regular, fontSize: 11, color: colors.primary, marginTop: 1 },
});
