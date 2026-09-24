import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

/** "Hear From Our Users" row; tapping opens a bottom sheet of reviews. */
export default function TestimonialsRow({ testimonials }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  if (!testimonials?.length) return null;

  return (
    <>
      <Card style={styles.card}>
        <TouchableOpacity style={styles.row} onPress={() => setOpen(true)} activeOpacity={0.8} accessibilityRole="button">
          <Ionicons name="chatbubble-ellipses-outline" size={26} color={colors.textPrimary} />
          <View style={styles.text}>
            <Text style={styles.title}>{t.hearFromUsers}</Text>
            <Text style={styles.sub}>{t.hearFromUsersSub}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </Card>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          {/* Inner Pressable swallows taps so touching the sheet doesn't dismiss it. */}
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>{t.hearFromUsers}</Text>
              <TouchableOpacity onPress={() => setOpen(false)} hitSlop={10} accessibilityLabel={t.close}>
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
              {testimonials.map((item, idx) => (
                <View key={`${item.name}-${idx}`} style={styles.review}>
                  <View style={styles.reviewHead}>
                    <Text style={styles.reviewName}>{item.name}</Text>
                    {item.rating ? (
                      <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Ionicons
                            key={n}
                            name={n <= item.rating ? 'star' : 'star-outline'}
                            size={13}
                            color={colors.gold}
                          />
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.reviewText}>{item.text}</Text>
                </View>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1, marginLeft: 12 },
  title: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textPrimary },
  sub: { fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary, marginTop: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(15,27,45,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    maxHeight: '75%',
  },
  sheetHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.textPrimary },
  review: { backgroundColor: '#F6F8FA', borderRadius: 12, padding: 12, marginBottom: 10 },
  reviewHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  reviewName: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textPrimary },
  stars: { flexDirection: 'row' },
  reviewText: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary },
});
