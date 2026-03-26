# Actuality Studio — Steiner Theme Implementation

## Current State
The app uses a warm parchment palette (oklch orange/brown tones, crimson buttons, Space Grotesk body font, Playfair Display headings, Space Mono code font). All color tokens are warm-tinted OKLCH values.

## Requested Changes (Diff)

### Add
- DM Sans Google Font (body)
- JetBrains Mono Google Font (code/mono)
- `--theme-glow` CSS custom property
- `shadow-glow-sm` Tailwind shadow utility
- `font-display` Tailwind font family (Playfair Display)

### Modify
- `index.html`: add DM Sans + JetBrains Mono to Google Fonts link
- `tailwind.config.js`: update font-sans/font-body → DM Sans, font-mono → JetBrains Mono, add font-display
- `src/index.css`: replace all OKLCH color tokens with Steiner's neutral grayscale OKLCH tokens; update body font to DM Sans; update --radius to 0.625rem

### Remove
- Space Grotesk references from font stacks
- Space Mono from mono font stack
- Warm parchment color tokens (replaced by neutral grays)

## Implementation Plan
1. Update index.html Google Fonts URL to include DM Sans + JetBrains Mono
2. Update tailwind.config.js font families
3. Replace index.css color tokens and body font with Steiner values
