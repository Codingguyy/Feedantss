import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, fonts } from '../styles/theme';
import { useLanguage } from '../hooks/useLanguage';
import { formatShortDate } from '../utils/format';

/**
 * Bottom call-to-action. Single source of truth for what it says and does,
 * driven entirely by server-computed state (`phase`, `viewer`) so the client
 * never re-derives eligibility rules that could drift from the backend.
 *
 *  logged out                       -> "Log in to Register"
 *  registered + submissions open    -> "Upload Submission" / "Registered"
 *  registered + not open yet        -> "Registered" / "Registered · Submissions open <date>" (disabled)
 *  registered + submissions closed  -> "Submissions Closed" (disabled)
 *  can register                     -> "Register Now" / "Pay ₹99 to confirm"
 *  otherwise                        -> disabled label for the current phase
 */
export default function RegisterButton({
  isAuthenticated,
  phase,
  viewer,
  entryFee,
  submissionOpensAt,
  loading,
  onRegister,
  onUpload,
  onRequireLogin,
}) {
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return <CtaButton title={t.ctaLogin} onPress={onRequireLogin} loading={loading} />;
  }

  if (viewer?.isRegistered) {
    if (viewer.canSubmit) {
      return <CtaButton title={t.ctaUpload} subtitle={t.ctaRegisteredSub} onPress={onUpload} />;
    }
    if (viewer.submissionState === 'CLOSED') {
      return <CtaButton title={t.ctaSubmissionClosed} subtitle={t.ctaRegisteredSub} disabled />;
    }
    const opens = formatShortDate(submissionOpensAt);
    return (
      <CtaButton
        title={t.ctaRegisteredSub}
        subtitle={opens ? t.ctaSubmissionOpens(opens) : t.ctaSubmissionSoon}
        disabled
      />
    );
  }

  if (viewer?.canRegister) {
    return (
      <CtaButton
        title={t.ctaRegister}
        subtitle={entryFee > 0 ? t.ctaRegisterPay(entryFee) : undefined}
        onPress={onRegister}
        loading={loading}
      />
    );
  }

  return <CtaButton title={disabledLabel(phase, t)} disabled muted />;
}

function disabledLabel(phase, t) {
  switch (phase) {
    case 'UPCOMING':
      return t.ctaOpensSoon;
    case 'REGISTRATION_FULL':
      return t.ctaFull;
    case 'REGISTRATION_CLOSED':
      return t.ctaRegClosed;
    case 'ONGOING':
      return t.ctaInProgress;
    case 'COMPLETED':
      return t.ctaEnded;
    case 'CANCELLED':
      return t.ctaCancelled;
    default:
      return t.ctaUnavailable;
  }
}

function CtaButton({ title, subtitle, onPress, loading, disabled, muted }) {
  const inactive = disabled || loading;
  return (
    <TouchableOpacity
      style={[styles.button, disabled && (muted ? styles.mutedBg : styles.disabledBg)]}
      onPress={onPress}
      disabled={inactive}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: !!loading }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.textWrap}>
          <Text style={[styles.title, muted && styles.mutedText]}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabledBg: { backgroundColor: '#6FA9AF' }, // teal, washed out: "yours, but not actionable yet"
  mutedBg: { backgroundColor: '#E5E8EC' },
  textWrap: { alignItems: 'center' },
  title: { fontFamily: fonts.semibold, fontSize: 15, color: '#fff' },
  mutedText: { color: colors.textMuted },
  subtitle: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.9)', marginTop: 1 },
});
