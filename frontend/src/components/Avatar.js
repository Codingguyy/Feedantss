import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';
import { initialsOf } from '../utils/format';

/**
 * Image with a graceful fallback (initials on a tinted circle/square) for
 * missing or broken URLs, so a dead CDN link never leaves an empty hole.
 */
export default function Avatar({ uri, name, width, height = width, radius = width / 2, style, children }) {
  const [failed, setFailed] = useState(false);
  const showImage = !!uri && !failed;

  return (
    <View style={[styles.box, { width, height, borderRadius: radius }, style]}>
      {showImage ? (
        <Image
          source={{ uri }}
          style={{ width, height, borderRadius: radius }}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: Math.min(width, height) * 0.36 }]}>{initialsOf(name)}</Text>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: { fontFamily: fonts.semibold, color: colors.primary },
});
