// UI labels only. Competition *content* (title, description, rules...) comes
// from the API as-is; localising that would need per-field translations in the
// database, which is out of scope here.
//
// Values are plain strings, or small functions when a number/plural is involved.

const EN_ORDINALS = ['1st', '2nd', '3rd'];
const HI_ORDINALS = ['पहला', 'दूसरा', 'तीसरा', 'चौथा', 'पाँचवाँ', 'छठा', 'सातवाँ', 'आठवाँ', 'नौवाँ', 'दसवाँ'];

export const STRINGS = {
  en: {
    goBack: 'Go back',
    registered: 'Registered',
    winnersCertificate: 'Winners get certificate',

    prizePool: 'Prize Pool',
    entryFee: 'Entry Fee',
    free: 'Free',
    spotsLeft: (n) => (n === 1 ? 'Only 1 spot left' : `Only ${n} spots left`),
    soldOut: 'No spots left',
    booked: (a, b) => `${a} / ${b} Booked`,

    judge: 'Judge',
    introVideo: 'Intro Video',

    countdownUpcoming: 'Registration opens in',
    countdownOpen: 'Registration closes in',
    countdownStarts: 'Starts in',
    countdownEnds: 'Ends in',
    hurryUp: 'Hurry up!',

    importantDates: 'Important Dates',
    registerBefore: 'Register Before',
    submissionStarts: 'Submission Starts',
    submissionEnds: 'Submission Ends',
    resultDate: 'Result Date',
    tba: 'To be announced',

    previousWinners: 'Previous Winners',
    winnerLabel: (n) => `${n <= 3 ? EN_ORDINALS[n - 1] : `${n}th`} Winner`,

    tabAbout: 'About Competition',
    tabJudging: 'Judging Parameters',
    tabRules: 'Rules & Eligibility',
    viewMore: 'View more',
    viewLess: 'View less',
    rules: 'Rules',
    eligibility: 'Eligibility',
    judgingEmpty: 'Judging parameters will be announced soon.',
    rulesEmpty: 'Rules will be announced soon.',

    rewards: 'Rewards',
    allPositions: '(All Positions)',

    disclaimerLabel: 'Disclaimer:',
    disclaimerDefault: 'Only contributions from paid participants will be considered for judging.',

    howReceivePrize: 'How will you receive prize money?',
    watchVideo: 'Watch video to know more',
    refundPolicy: 'Refund policy',
    securePayments: 'Secure payments powered by',

    referTitle: 'Refer & Earn more discount',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    referNow: 'Refer Now',
    youEarn: (n) => `You earn ₹${n} for every signup`,
    referLoginPrompt: 'Log in to get your referral link',
    referShare: (title, link) => `Join me on Feedants and compete in "${title}"! Sign up with my link: ${link}`,

    hearFromUsers: 'Hear From Our Users',
    hearFromUsersSub: 'See what participants say about Feedants',
    close: 'Close',

    adHere: 'Ad Here',

    // CTA
    ctaLogin: 'Log in to Register',
    ctaRegister: 'Register Now',
    ctaRegisterPay: (n) => `Pay ₹${n} to confirm`,
    ctaUpload: 'Upload Submission',
    ctaRegisteredSub: 'Registered',
    ctaSubmissionSoon: 'Submissions open soon',
    ctaSubmissionOpens: (d) => `Registered · Submissions open ${d}`,
    ctaSubmissionClosed: 'Submissions Closed',
    ctaOpensSoon: 'Registration Opens Soon',
    ctaFull: 'Competition Full',
    ctaRegClosed: 'Registration Closed',
    ctaInProgress: 'Competition In Progress',
    ctaEnded: 'Competition Ended',
    ctaCancelled: 'Competition Cancelled',
    ctaUnavailable: 'Registration Unavailable',

    // Dialogs
    regFailed: 'Registration failed',
    regSuccessTitle: 'You\u2019re in!',
    regSuccessBody: 'Your registration is confirmed.',
    withdrawTitle: 'Withdraw registration?',
    withdrawBody: 'You can register again later if spots remain.',
    withdraw: 'Withdraw',
    cancel: 'Cancel',
    withdrawFailed: 'Could not withdraw',
    uploadSoonTitle: 'Upload Submission',
    uploadSoonBody: 'Submission upload is coming soon.',
    comingSoon: 'Coming soon',
    comingSoonBody: 'This section is not part of the competition module yet.',
    couldNotLoad: 'Couldn\u2019t load this competition',
    retry: 'Retry',

    // Bottom nav
    navHome: 'Home',
    navExplore: 'Explore',
    navCompetitions: 'Competitions',
    navProfile: 'Profile',
    logoutTitle: 'Log out?',
    logout: 'Log out',

    // Status badge (when not registered)
    phaseUpcoming: 'Upcoming',
    phaseOpen: 'Registration Open',
    phaseFull: 'Full',
    phaseClosed: 'Registration Closed',
    phaseLive: 'Live Now',
    phaseCompleted: 'Completed',
    phaseCancelled: 'Cancelled',
  },

  hi: {
    goBack: 'वापस जाएं',
    registered: 'पंजीकृत',
    winnersCertificate: 'विजेताओं को प्रमाणपत्र',

    prizePool: 'पुरस्कार राशि',
    entryFee: 'प्रवेश शुल्क',
    free: 'निःशुल्क',
    spotsLeft: (n) => `केवल ${n} स्थान शेष`,
    soldOut: 'कोई स्थान शेष नहीं',
    booked: (a, b) => `${a} / ${b} बुक`,

    judge: 'निर्णायक',
    introVideo: 'परिचय वीडियो',

    countdownUpcoming: 'पंजीकरण शुरू होने में',
    countdownOpen: 'पंजीकरण बंद होने में',
    countdownStarts: 'शुरू होने में',
    countdownEnds: 'समाप्त होने में',
    hurryUp: 'जल्दी करें!',

    importantDates: 'महत्वपूर्ण तिथियां',
    registerBefore: 'पंजीकरण से पहले',
    submissionStarts: 'सबमिशन शुरू',
    submissionEnds: 'सबमिशन समाप्त',
    resultDate: 'परिणाम तिथि',
    tba: 'जल्द घोषित होगा',

    previousWinners: 'पिछले विजेता',
    winnerLabel: (n) => `${n <= 10 ? HI_ORDINALS[n - 1] : `${n}वाँ`} विजेता`,

    tabAbout: 'प्रतियोगिता के बारे में',
    tabJudging: 'निर्णय मानदंड',
    tabRules: 'नियम और पात्रता',
    viewMore: 'और देखें',
    viewLess: 'कम देखें',
    rules: 'नियम',
    eligibility: 'पात्रता',
    judgingEmpty: 'निर्णय मानदंड जल्द घोषित किए जाएंगे।',
    rulesEmpty: 'नियम जल्द घोषित किए जाएंगे।',

    rewards: 'पुरस्कार',
    allPositions: '(सभी स्थान)',

    disclaimerLabel: 'अस्वीकरण:',
    disclaimerDefault: 'केवल भुगतान करने वाले प्रतिभागियों की प्रविष्टियों पर ही निर्णय के लिए विचार किया जाएगा।',

    howReceivePrize: 'पुरस्कार राशि कैसे मिलेगी?',
    watchVideo: 'अधिक जानने के लिए वीडियो देखें',
    refundPolicy: 'रिफंड नीति',
    securePayments: 'सुरक्षित भुगतान द्वारा',

    referTitle: 'रेफर करें और अधिक छूट पाएं',
    copyLink: 'लिंक कॉपी करें',
    copied: 'कॉपी हो गया!',
    referNow: 'अभी रेफर करें',
    youEarn: (n) => `हर साइनअप पर आप ₹${n} कमाएंगे`,
    referLoginPrompt: 'रेफरल लिंक पाने के लिए लॉग इन करें',
    referShare: (title, link) => `मेरे साथ Feedants पर "${title}" में भाग लें! मेरे लिंक से साइन अप करें: ${link}`,

    hearFromUsers: 'हमारे यूज़र्स से सुनें',
    hearFromUsersSub: 'देखें कि प्रतिभागी Feedants के बारे में क्या कहते हैं',
    close: 'बंद करें',

    adHere: 'यहाँ विज्ञापन',

    ctaLogin: 'रजिस्टर करने के लिए लॉग इन करें',
    ctaRegister: 'अभी रजिस्टर करें',
    ctaRegisterPay: (n) => `पुष्टि के लिए ₹${n} का भुगतान करें`,
    ctaUpload: 'सबमिशन अपलोड करें',
    ctaRegisteredSub: 'पंजीकृत',
    ctaSubmissionSoon: 'सबमिशन जल्द खुलेंगे',
    ctaSubmissionOpens: (d) => `पंजीकृत · सबमिशन ${d} से खुलेंगे`,
    ctaSubmissionClosed: 'सबमिशन बंद हो गए',
    ctaOpensSoon: 'पंजीकरण जल्द शुरू होगा',
    ctaFull: 'प्रतियोगिता पूर्ण',
    ctaRegClosed: 'पंजीकरण बंद',
    ctaInProgress: 'प्रतियोगिता जारी है',
    ctaEnded: 'प्रतियोगिता समाप्त',
    ctaCancelled: 'प्रतियोगिता रद्द',
    ctaUnavailable: 'पंजीकरण उपलब्ध नहीं',

    regFailed: 'पंजीकरण विफल',
    regSuccessTitle: 'आप शामिल हो गए!',
    regSuccessBody: 'आपका पंजीकरण पक्का हो गया है।',
    withdrawTitle: 'पंजीकरण वापस लें?',
    withdrawBody: 'स्थान शेष रहने पर आप बाद में फिर रजिस्टर कर सकते हैं।',
    withdraw: 'वापस लें',
    cancel: 'रद्द करें',
    withdrawFailed: 'वापस नहीं ले सके',
    uploadSoonTitle: 'सबमिशन अपलोड करें',
    uploadSoonBody: 'सबमिशन अपलोड जल्द आ रहा है।',
    comingSoon: 'जल्द आ रहा है',
    comingSoonBody: 'यह सेक्शन अभी प्रतियोगिता मॉड्यूल का हिस्सा नहीं है।',
    couldNotLoad: 'यह प्रतियोगिता लोड नहीं हो सकी',
    retry: 'पुनः प्रयास करें',

    navHome: 'होम',
    navExplore: 'एक्सप्लोर',
    navCompetitions: 'प्रतियोगिताएं',
    navProfile: 'प्रोफाइल',
    logoutTitle: 'लॉग आउट करें?',
    logout: 'लॉग आउट',

    phaseUpcoming: 'जल्द आ रहा है',
    phaseOpen: 'पंजीकरण खुला',
    phaseFull: 'पूर्ण',
    phaseClosed: 'पंजीकरण बंद',
    phaseLive: 'लाइव',
    phaseCompleted: 'समाप्त',
    phaseCancelled: 'रद्द',
  },
};
