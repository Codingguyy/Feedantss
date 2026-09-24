import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';

const COLLAPSED_LINES = 3;
const COLLAPSED_ITEMS = 3;
const LONG_TEXT_THRESHOLD = 150; // chars; rough proxy for "more than 3 lines"

/**
 * "About Competition | Judging Parameters | Rules & Eligibility" tabs.
 * Each tab collapses to a short preview with a "View more" toggle, matching
 * the design; expanded state resets when switching tabs.
 */
export default function InfoTabs({ data }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState('about');
  const [expanded, setExpanded] = useState(false);

  const tabs = [
    { key: 'about', label: t.tabAbout },
    { key: 'judging', label: t.tabJudging },
    { key: 'rules', label: t.tabRules },
  ];

  const switchTab = (key) => {
    setTab(key);
    setExpanded(false);
  };

  const rules = data.rules || [];
  const eligibility = data.eligibility || [];
  const judging = data.judgingParameters || [];

  // Whether the active tab has anything hidden behind "View more".
  const hasMore =
    tab === 'about'
      ? (data.description || '').length > LONG_TEXT_THRESHOLD
      : tab === 'judging'
      ? judging.length > COLLAPSED_ITEMS
      : rules.length + eligibility.length > COLLAPSED_ITEMS;

  return (
    <Card style={styles.card}>
      <View style={styles.tabBar}>
        {tabs.map((item) => {
          const active = item.key === tab;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => switchTab(item.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]} numberOfLines={1}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.body}>
        {tab === 'about' && (
          <Text style={styles.text} numberOfLines={expanded ? undefined : COLLAPSED_LINES}>
            {data.description}
          </Text>
        )}

        {tab === 'judging' &&
          (judging.length === 0 ? (
            <Text style={styles.text}>{t.judgingEmpty}</Text>
          ) : (
            (expanded ? judging : judging.slice(0, COLLAPSED_ITEMS)).map((p) => (
              <View key={p.name} style={styles.paramRow}>
                <View style={styles.paramHead}>
                  <Text style={styles.paramName}>{p.name}</Text>
                  {p.weight != null && <Text style={styles.paramWeight}>{p.weight}%</Text>}
                </View>
                {!!p.description && <Text style={styles.text}>{p.description}</Text>}
              </View>
            ))
          ))}

        {tab === 'rules' && (
          <RulesContent
            rules={rules}
            eligibility={eligibility}
            expanded={expanded}
            labels={{ rules: t.rules, eligibility: t.eligibility, empty: t.rulesEmpty }}
          />
        )}
      </View>

      {hasMore && (
        <TouchableOpacity style={styles.toggle} onPress={() => setExpanded((v) => !v)} accessibilityRole="button">
          <Text style={styles.toggleText}>{expanded ? t.viewLess : t.viewMore}</Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.primary} />
        </TouchableOpacity>
      )}
    </Card>
  );
}

function RulesContent({ rules, eligibility, expanded, labels }) {
  if (rules.length === 0 && eligibility.length === 0) {
    return <Text style={styles.text}>{labels.empty}</Text>;
  }

  // One shared budget of items across both lists while collapsed.
  const budget = expanded ? Infinity : COLLAPSED_ITEMS;
  const shownRules = rules.slice(0, budget);
  const shownEligibility = eligibility.slice(0, Math.max(budget - shownRules.length, 0));

  return (
    <View>
      {shownRules.length > 0 && (
        <>
          <Text style={styles.subHeading}>{labels.rules}</Text>
          {shownRules.map((r, i) => (
            <View key={`r${i}`} style={styles.listRow}>
              <Text style={styles.bullet}>{i + 1}.</Text>
              <Text style={[styles.text, styles.listText]}>{r}</Text>
            </View>
          ))}
        </>
      )}
      {shownEligibility.length > 0 && (
        <>
          <Text style={[styles.subHeading, shownRules.length > 0 && { marginTop: 10 }]}>{labels.eligibility}</Text>
          {shownEligibility.map((e, i) => (
            <View key={`e${i}`} style={styles.listRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.text, styles.listText]}>{e}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 10, overflow: 'hidden' },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: 14,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 13, marginBottom: -1, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.primary },
  tabText: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.tabInactive },
  tabTextActive: { fontFamily: fonts.semibold, color: colors.primary },
  body: { paddingHorizontal: 14, paddingTop: 12 },
  text: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 20, color: colors.textSecondary },
  toggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 8 },
  toggleText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary, marginRight: 4 },
  paramRow: { marginBottom: 10 },
  paramHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paramName: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textPrimary },
  paramWeight: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.primary },
  subHeading: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textPrimary, marginBottom: 4 },
  listRow: { flexDirection: 'row', marginBottom: 2 },
  bullet: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 20, color: colors.textMuted, width: 20 },
  listText: { flex: 1 },
});
