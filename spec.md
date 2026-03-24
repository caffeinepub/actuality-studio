# Actuality Studio

## Current State
- Header has a logo icon + "Actuality Studio" text in gold/black on the left side
- AboutSection uses a two-column layout: text on left, images on right (side by side)
- ProductTeaserGrid shows a 4-column grid of product cards
- Mission section in LandingPage has existing placeholder text
- AdminDashboardPage has discount settings and admin principal management but no product management

## Requested Changes (Diff)

### Add
- Full-width product image carousel in place of the product grid, with forward/back navigation buttons
- Product info card below the carousel image that updates when image changes
- Admin product management panel in AdminDashboardPage: add/remove products with image URL and descriptor fields
- Local state for products that can be managed by admin (stored in component state for now, seeded with existing 4 products)

### Modify
- Header: Remove the "Actuality Studio" text span entirely (keep only the logo icon as the clickable link)
- AboutSection: Change from two-column (text+images) to stacked layout — text at full width, then images below the text
- Mission section text: Replace current paragraph text with the new provided mission text
- ProductTeaserGrid section heading: keep "Catalog Preview / Featured Products" heading but render a single full-width carousel below it

### Remove
- The 4-column product card grid in ProductTeaserGrid
- The "Actuality Studio" text label in the header left side

## Implementation Plan
1. Update `Header.tsx`: Remove the `<span>` with "Actuality Studio" text, keep only the logo `<img>` as the link
2. Update `AboutSection.tsx`: Restructure layout so text block is full width on top, images grid appears below the text block
3. Create new `CatalogPreviewCarousel.tsx` component:
   - Full-width image with prev/next buttons overlaid or beside
   - Product info card attached below (title, description, badge) that animates/transitions when product changes
   - Admin controls: if isAdmin, show Add Product form and Remove button per product
   - Products stored in React state, seeded with the 4 existing products
4. Update `ProductTeaserGrid.tsx` OR replace it with `CatalogPreviewCarousel.tsx` in LandingPage
5. Update Mission section in `LandingPage.tsx` with the new mission text
