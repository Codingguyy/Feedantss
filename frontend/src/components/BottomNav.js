import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { initialsOf } from '../utils/format';

const INACTIVE = '#7C8B99';

/**
 * Bottom tab bar from the design. This is presentational: the parent decides
 * what each key does (`onPressItem('home' | 'explore' | 'add' | 'competitions' | 'profile')`).
 */
export default function BottomNav({ active = 'competitions', user, onPressItem }) {
  const { t } = useLanguage();

  return (
    <View style={styles.bar}>
      <NavItem active={active} onPress={onPressItem} id="home" label={t.navHome} icon={(c) => <Ionicons name="home" size={24} color={c} />} />
      <NavItem active={active} onPress={onPressItem} id="explore" label={t.navExplore} icon={(c) => <Ionicons name="search-outline" size={24} color={c} />} />

      <View style={styles.item}>
        <TouchableOpacity style={styles.plus} onPress={() => onPressItem?.('add')} activeOpacity={0.85} accessibilityLabel="Create">
          <Ionicons name="add-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <NavItem active={active} onPress={onPressItem} id="competitions" label={t.navCompetitions} icon={(c) => <Ionicons name="trophy" size={24} color={c} />} />
      <NavItem
        active={active}
        onPress={onPressItem}
        id="profile"
        label={t.navProfile}
        icon={(c) =>
          user ? (
            <View style={[styles.avatar, active === 'profile' && { borderColor: c }]}>
              <Text style={styles.avatarText}>{initialsOf(user.name) || '?'}</Text>
            </View>
          ) : (
            <Ionicons name="person-circle-outline" size={26} color={c} />
          )
        }
      />
    </View>
  );
}

function NavItem({ id, label, icon, active, onPress }) {
  const isActive = id === active;
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress?.(id)} activeOpacity={0.7} accessibilityRole="button">
      {icon(isActive ? colors.primary : INACTIVE)}
      <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 6,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', minHeight: 48 },
  label: { fontFamily: fonts.medium, fontSize: 10.5, color: INACTIVE, marginTop: 3 },
  labelActive: { color: colors.primary },
  plus: {
    width: 54,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primaryDark,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: fonts.semibold, fontSize: 10, color: '#fff' },
});
