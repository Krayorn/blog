/**
 * Faction theme definitions for battle reports.
 * Each faction maps to a set of CSS custom properties that drive the entire page theme.
 *
 * To add a new faction, just add an entry here — all components use these variables.
 */

export type FactionTheme = {
    // Page background (parchment/base)
    '--br-bg': string;
    '--br-bg-dark': string;
    // Primary accent (faction identity color)
    '--br-primary': string;
    '--br-primary-light': string;
    // Secondary accent (metallic/trim)
    '--br-accent': string;
    '--br-accent-light': string;
    // Text colors
    '--br-text': string;
    '--br-text-muted': string;
    '--br-text-on-dark': string;
    // Panel / card backgrounds
    '--br-panel': string;
    '--br-panel-border': string;
    // Quote styling
    '--br-quote-border': string;
    '--br-quote-bg': string;
    // Decorative symbol (Unicode)
    '--br-symbol': string;
};

const themes: Record<string, FactionTheme> = {
    'Adepta Sororitas': {
        '--br-bg': '#f5e6c8',
        '--br-bg-dark': '#e8d5a8',
        '--br-primary': '#8b1a1a',
        '--br-primary-light': '#a52a2a',
        '--br-accent': '#c9a84c',
        '--br-accent-light': '#dfc06a',
        '--br-text': '#2a1a0a',
        '--br-text-muted': '#6b5a42',
        '--br-text-on-dark': '#f5e6c8',
        '--br-panel': '#1a1010',
        '--br-panel-border': '#c9a84c',
        '--br-quote-border': '#c9a84c',
        '--br-quote-bg': 'rgba(201, 168, 76, 0.08)',
        '--br-symbol': '⚜',
    },
    'Space Marines': {
        '--br-bg': '#e8edf2',
        '--br-bg-dark': '#cdd5de',
        '--br-primary': '#1a3a6b',
        '--br-primary-light': '#2a5a9b',
        '--br-accent': '#c9a84c',
        '--br-accent-light': '#dfc06a',
        '--br-text': '#0a1a2a',
        '--br-text-muted': '#4a5a6b',
        '--br-text-on-dark': '#e8edf2',
        '--br-panel': '#0f1923',
        '--br-panel-border': '#c9a84c',
        '--br-quote-border': '#1a3a6b',
        '--br-quote-bg': 'rgba(26, 58, 107, 0.06)',
        '--br-symbol': '⚔',
    },
    'Astra Militarum': {
        '--br-bg': '#e8e0c8',
        '--br-bg-dark': '#d4c8a8',
        '--br-primary': '#4a5a2a',
        '--br-primary-light': '#6a7a3a',
        '--br-accent': '#8b7a4a',
        '--br-accent-light': '#a89a6a',
        '--br-text': '#1a1a0a',
        '--br-text-muted': '#5a5a3a',
        '--br-text-on-dark': '#e8e0c8',
        '--br-panel': '#1a1a10',
        '--br-panel-border': '#8b7a4a',
        '--br-quote-border': '#4a5a2a',
        '--br-quote-bg': 'rgba(74, 90, 42, 0.06)',
        '--br-symbol': '☩',
    },
};

const defaultTheme: FactionTheme = themes['Adepta Sororitas'];

/**
 * Returns the theme for a given faction name.
 * Falls back to Adepta Sororitas if faction is unknown.
 */
export function getFactionTheme(faction: string): FactionTheme {
    return themes[faction] ?? defaultTheme;
}

/**
 * Converts a theme object to a CSS variables string for use in a `style` attribute.
 */
export function themeToStyle(theme: FactionTheme): string {
    return Object.entries(theme)
        .filter(([key]) => key.startsWith('--'))
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
}
