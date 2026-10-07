/**
 * CareerAI Design System Tokens
 * LIGHT MODE FIRST PALETTE (Warm, Minimalistic, Human-Designed SaaS)
 *
 * Primary palette:
 * - Burgundy / Wine: #8B0026
 * - Dark Burgundy: #65001C
 * - Cream: #F3E5D0
 * - Ivory / Off-White: #FFF9F2
 * - Coral / Rose: #D64F63
 * - Soft Coral: #E9838F
 * - Yellow: #F3C43E
 * - Soft Yellow: #FFF1B8
 * - Dark Text: #1E1B1C
 * - Secondary Text: #5F5A5C
 * - Muted Text: #817B7E
 * - Border: #E8DED4
 * - Soft Surface: #FAF5EF
 * - Success: #238B68
 * - Danger: #C63D50
 * - Info: #5275B8
 */

export const THEME_COLORS = {
  // Core Light Backgrounds
  background: '#FFF9F2',          // Ivory / Page background
  backgroundElevated: '#FAF5EF',  // Soft surface
  surface: '#FFFFFF',             // Card / Container pure surface
  surfaceSecondary: '#FAF5EF',    // Secondary card surface
  surfaceWarm: '#F3E5D0',         // Cream accent surface

  // Brand Palette (Burgundy / Wine)
  brand: '#8B0026',               // Primary CTA, active nav, brand headings
  brandDark: '#65001C',           // Dark Burgundy (hover, strong emphasis)
  brandSoft: 'rgba(139, 0, 38, 0.08)',
  brandMuted: '#FAF0E8',

  // Accent Colors
  accentCoral: '#D64F63',         // Coral / Rose highlight
  accentCoralSoft: '#E9838F',     // Soft Coral
  accentCoralSubtle: 'rgba(214, 79, 99, 0.1)',
  accentYellow: '#F3C43E',        // Yellow warnings & interview reminders
  accentYellowSoft: '#FFF1B8',    // Soft Yellow highlight surface
  accentYellowSubtle: 'rgba(243, 196, 62, 0.15)',

  // Typography
  textPrimary: '#1E1B1C',         // Dark Text
  textSecondary: '#5F5A5C',       // Secondary Text
  textMuted: '#817B7E',           // Muted Text
  textInverse: '#FFFFFF',         // White on Burgundy/Dark

  // Status & Semantic
  success: '#238B68',             // Green - verified, shortlisted
  successSoft: 'rgba(35, 139, 104, 0.12)',
  warning: '#F3C43E',             // Yellow
  warningSoft: '#FFF1B8',
  danger: '#C63D50',              // Rose Red / Danger
  dangerSoft: 'rgba(198, 61, 80, 0.12)',
  info: '#5275B8',                // Blue - informative semantic states only
  infoSoft: 'rgba(82, 117, 184, 0.12)',

  // Borders & Focus
  border: '#E8DED4',              // Warm border
  borderLight: '#F3ECE3',
  borderStrong: '#D9CEC2',
  focus: '#8B0026',

  // Backward-compatible semantic aliases
  brandPrimary: '#8B0026',
  brandPrimaryHover: '#65001C',
  brandSecondary: '#65001C',
  highlightCoral: '#D64F63',
  highlightCoralSoft: '#E9838F',
  surfaceIvory: '#FFF9F2',
  surfaceIvorySoft: '#FAF5EF',

  bg: {
    main: '#FFF9F2',
    secondary: '#FAF5EF',
    card: '#FFFFFF',
    subtle: '#F3E5D0',
    hover: '#F7EFE4',
    border: '#E8DED4',
    borderLight: '#F3ECE3',
  },
  brandGroup: {
    primary: '#8B0026',
    primaryHover: '#65001C',
    primarySubtle: 'rgba(139, 0, 38, 0.08)',
    accent: '#D64F63',
    accentHover: '#E9838F',
    accentSubtle: 'rgba(214, 79, 99, 0.1)',
    wine: '#8B0026',
    cream: '#F3E5D0',
    ivory: '#FFF9F2',
  },
  status: {
    success: '#238B68',
    successSubtle: 'rgba(35, 139, 104, 0.12)',
    warning: '#F3C43E',
    warningSubtle: '#FFF1B8',
    danger: '#C63D50',
    dangerSubtle: 'rgba(198, 61, 80, 0.12)',
    info: '#5275B8',
    infoSubtle: 'rgba(82, 117, 184, 0.12)',
  },
  text: {
    main: '#1E1B1C',
    muted: '#5F5A5C',
    subtle: '#817B7E',
    inverse: '#FFFFFF',
  },
};

export const BRAND_INFO = {
  name: 'CareerAI',
  tagline: 'AI-POWERED PLACEMENT & RESUME ANALYZER',
  subtagline: 'Campus Placement & Recruiter Intelligence Platform',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
