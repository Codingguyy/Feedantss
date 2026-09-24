import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import StatusBadge from './StatusBadge';
import InfoCard from './InfoCard';
import SpotsProgressBar from './SpotsProgressBar';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { formatINR } from '../utils/format';

/** Title, tags, prize / fee / spots - the top card of the details screen. */
export default function CompetitionHeaderCard({ data, onPressRegisteredBadge }) {
  const { t } = useLanguage();
  const registered = !!data.viewer?.isRegistered;

  return (
    <Card>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{data.title}</Text>
        <StatusBadge
          phase={data.phase}
          registered={registered}
          onPress={registered && data.viewer?.canWithdraw ? onPressRegisteredBadge : undefined}
        />
      </View>

      <View style={styles.tagsRow}>
        {(data.tags || []).map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {data.winnersGetCertificate && (
          <View style={styles.certificate}>
            <Ionicons name="trophy-outline" size={17} color={colors.primary} />
            <Text style={styles.certificateText}>{t.winnersCertificate}</Text>
          </View>
        )}
      </View>

      <View style={styles.statsRow}>
        <InfoCard label={t.prizePool} value={formatINR(data.prizePool)} accent />
        <InfoCard
          label={t.entryFee}
          value={data.entryFee > 0 ? formatINR(data.entryFee) : t.free}
          style={styles.fee}
        />
        <SpotsProgressBar
          style={styles.spots}
          current={data.currentParticipantsCount}
          max={data.maxParticipants}
          spotsRemaining={data.spotsRemaining}
          isAlmostFull={data.isAlmostFull}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textPrimary,
    marginRight: 10,
    paddingTop: 2,
  },
  tagsRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 8 },
  tag: {
    backgroundColor: '#F1F2F5',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: { fontFamily: fonts.medium, fontSize: 12, color: colors.textPrimary },
  certificate: { flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginBottom: 4 },
  certificateText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary, marginLeft: 6 },
  statsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 14 },
  fee: { marginLeft: 20, marginTop: 1 },
  spots: { flex: 1, marginLeft: 20, minWidth: 110, marginTop: 2 },
});
