import React, { useCallback, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../components/ScreenHeader';
import CompetitionHeaderCard from '../components/CompetitionHeaderCard';
import JudgeCard from '../components/JudgeCard';
import CountdownTimer from '../components/CountdownTimer';
import ImportantDates from '../components/ImportantDates';
import PreviousWinners from '../components/PreviousWinners';
import InfoTabs from '../components/InfoTabs';
import RewardsList from '../components/RewardsList';
import DisclaimerBanner from '../components/DisclaimerBanner';
import PrizeInfoRow from '../components/PrizeInfoRow';
import ReferralCard from '../components/ReferralCard';
import TestimonialsRow from '../components/TestimonialsRow';
import AdSlot from '../components/AdSlot';
import RegisterButton from '../components/RegisterButton';
import BottomNav from '../components/BottomNav';

import { useCompetitionDetails } from '../hooks/useCompetitionDetails';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { notify, confirm } from '../utils/dialog';
import { openUrl } from '../utils/links';
import { colors, fonts } from '../styles/theme';

// Which countdown caption to show for each phase. The server decides *what*
// we count down to (`countdownTarget`); this only picks a translated label.
const COUNTDOWN_LABEL_KEY = {
  UPCOMING: 'countdownUpcoming',
  REGISTRATION_OPEN: 'countdownOpen',
  REGISTRATION_FULL: 'countdownStarts',
  REGISTRATION_CLOSED: 'countdownStarts',
  ONGOING: 'countdownEnds',
};

export default function CompetitionDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { competitionId } = route.params;
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const scrollRef = useRef(null);

  const {
    data,
    fetchedAt,
    loading,
    refreshing,
    error,
    actionLoading,
    actionError,
    onRefresh,
    reload,
    register,
    withdraw,
  } = useCompetitionDetails(competitionId, { isAuthenticated });

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Home');
  }, [navigation]);

  const handleRequireLogin = useCallback(() => {
    navigation.navigate('Login', { returnTo: { screen: 'CompetitionDetails', params: { competitionId } } });
  }, [navigation, competitionId]);

  const handleRegister = useCallback(async () => {
    const { ok, error: err } = await register();
    if (ok) notify(t.regSuccessTitle, t.regSuccessBody);
    else notify(t.regFailed, err.message);
  }, [register, t]);

  const handleWithdraw = useCallback(async () => {
    const yes = await confirm({
      title: t.withdrawTitle,
      message: t.withdrawBody,
      confirmText: t.withdraw,
      cancelText: t.cancel,
      destructive: true,
    });
    if (!yes) return;
    const { ok, error: err } = await withdraw();
    if (!ok) notify(t.withdrawFailed, err.message);
  }, [withdraw, t]);

  const handleUpload = useCallback(() => {
    // Submission upload isn't part of this module yet; the CTA state itself is server-driven.
    notify(t.uploadSoonTitle, t.uploadSoonBody);
  }, [t]);

  const handleNav = useCallback(
    async (key) => {
      switch (key) {
        case 'home':
          navigation.navigate('Home');
          break;
        case 'competitions':
          scrollRef.current?.scrollTo({ y: 0, animated: true });
          break;
        case 'profile':
          if (!isAuthenticated) return handleRequireLogin();
          if (await confirm({ title: t.logoutTitle, confirmText: t.logout, cancelText: t.cancel, destructive: true })) {
            await logout();
          }
          break;
        default:
          notify(t.comingSoon, t.comingSoonBody);
      }
    },
    [navigation, isAuthenticated, handleRequireLogin, logout, t]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <ScreenHeader onBack={goBack} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <ScreenHeader onBack={goBack} />
        <View style={styles.center}>
          <Text style={styles.errorTitle}>{t.couldNotLoad}</Text>
          <Text style={styles.errorSubtitle}>{error?.message}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => reload()}>
            <Text style={styles.retryText}>{t.retry}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const countdownKey = COUNTDOWN_LABEL_KEY[data.phase];

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScreenHeader onBack={goBack} />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        <CompetitionHeaderCard data={data} onPressRegisteredBadge={handleWithdraw} />

        <JudgeCard judge={data.judge} onPlayIntro={() => openUrl(data.judge?.introVideoUrl)} />

        {!!data.countdownTarget && (
          <CountdownTimer
            targetDate={data.countdownTarget}
            label={countdownKey ? t[countdownKey] : data.countdownLabel}
            hint={data.phase === 'REGISTRATION_OPEN' ? t.hurryUp : undefined}
            serverTime={data.serverTime}
            fetchedAt={fetchedAt}
            onComplete={() => reload({ silent: true })}
          />
        )}

        <ImportantDates data={data} />

        <PreviousWinners winners={data.previousWinners} onPlayVideo={openUrl} />

        <InfoTabs data={data} />

        <RewardsList rewards={data.rewards} />

        <DisclaimerBanner text={data.disclaimer} />

        {(!!data.prizeMoneyVideoUrl || !!data.refundPolicyUrl) && (
          <PrizeInfoRow
            videoUrl={data.prizeMoneyVideoUrl}
            refundPolicyUrl={data.refundPolicyUrl}
            onOpenUrl={openUrl}
          />
        )}

        {data.referralRewardAmount > 0 && (
          <ReferralCard
            link={data.viewer?.referralLink}
            rewardAmount={data.referralRewardAmount}
            competitionTitle={data.title}
            onRequireLogin={handleRequireLogin}
          />
        )}

        <TestimonialsRow testimonials={data.testimonials} />

        <AdSlot />

        {!!actionError && actionError.code !== 'ALREADY_REGISTERED' && (
          <Text style={styles.actionErrorText}>{actionError.message}</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.cta}>
          <RegisterButton
            isAuthenticated={isAuthenticated}
            phase={data.phase}
            viewer={data.viewer}
            entryFee={data.entryFee}
            submissionOpensAt={data.competitionStartDate}
            loading={actionLoading}
            onRegister={handleRegister}
            onUpload={handleUpload}
            onRequireLogin={handleRequireLogin}
          />
        </View>
        <BottomNav active="competitions" user={user} onPressItem={handleNav} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16, gap: 10 },
  footer: { backgroundColor: colors.background, borderTopWidth: 1, borderTopColor: colors.border },
  cta: { paddingHorizontal: 16, paddingTop: 10 },
  actionErrorText: { fontFamily: fonts.medium, fontSize: 12, color: colors.danger },
  errorTitle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.textPrimary, marginBottom: 4 },
  errorSubtitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
  retryText: { fontFamily: fonts.semibold, fontSize: 14, color: '#fff' },
});
