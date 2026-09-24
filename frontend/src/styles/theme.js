// Design tokens for the light / teal Feedants look.
// Token *names* (background, surface, border, textPrimary...) are unchanged
// from the previous dark theme so every screen keeps working; only values
// changed, plus a few new tokens used by the redesigned details screen.
export const colors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F6F8',
  border: '#E8ECF0',
  textPrimary: '#0F1B2D',
  textSecondary: '#5B6675',
  textMuted: '#8A94A3',

  primary: '#007480',
  primaryDark: '#005A63',
  primaryMuted: '#E8F4F5', // banners, pills
  primaryBorder: '#BEDEE1',
  primaryTrack: '#D7EBEE', // progress track
  tabInactive: '#4E8B92',

  success: '#1E9E5A',
  successMuted: '#E3FAED', // referral card
  warning: '#D97706',
  warningMuted: 'rgba(245, 158, 11, 0.15)',
  danger: '#DC2626',
  dangerMuted: 'rgba(239, 68, 68, 0.12)',
  neutralMuted: '#EEF0F3',

  gold: '#FCB102',
  silver: '#9AA5B1',
  bronze: '#F26B21',
  razorpay: '#072654',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

// Poppins, loaded in App.js. Weight is baked into the family name, so we
// never set `fontWeight` alongside it (Android ignores/garbles that combo).
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

export const typography = {
  h1: { fontFamily: fonts.bold, fontSize: 22 },
  h2: { fontFamily: fonts.semibold, fontSize: 16 },
  body: { fontFamily: fonts.regular, fontSize: 14 },
  caption: { fontFamily: fonts.medium, fontSize: 12 },
  label: { fontFamily: fonts.semibold, fontSize: 11, letterSpacing: 0.4 },
};

export const shadow = {
  card: {
    shadowColor: '#0F1B2D',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
};

// Central mapping of backend `phase` -> UI treatment, so every component
// that needs to color/label a phase reads from one place.
// `labelKey` indexes into the i18n strings.
export const PHASE_META = {
  UPCOMING: { labelKey: 'phaseUpcoming', color: colors.textSecondary, bg: colors.neutralMuted },
  REGISTRATION_OPEN: { labelKey: 'phaseOpen', color: colors.success, bg: colors.successMuted },
  REGISTRATION_FULL: { labelKey: 'phaseFull', color: colors.warning, bg: colors.warningMuted },
  REGISTRATION_CLOSED: { labelKey: 'phaseClosed', color: colors.textSecondary, bg: colors.neutralMuted },
  ONGOING: { labelKey: 'phaseLive', color: colors.primary, bg: colors.primaryMuted },
  COMPLETED: { labelKey: 'phaseCompleted', color: colors.textMuted, bg: colors.neutralMuted },
  CANCELLED: { labelKey: 'phaseCancelled', color: colors.danger, bg: colors.dangerMuted },
};
