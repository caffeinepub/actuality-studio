# Actuality Studio

## Current State
CatalogPage.tsx uses `opacity: imgLoaded ? 1 : 0` with `onLoad` on catalog card images — causing blank images whenever browser cache skips the onLoad event. FindItemsPanel uses dummyjson.com thumbnails (blocked by ICP CSP) and result cards only show a small thumbnail + price badge with no order/payment links.

## Requested Changes (Diff)

### Add
- Result cards in FindItemsPanel show: image, title, description, price, "View & Order" button linking to an Amazon/Google Shopping search for that product
- Payment/order info section in TagUploadPanel showing price with "Order Now" external link
- When item is uploaded to catalog, the catalog card stores and displays a source URL so users can click through to purchase

### Modify
- Remove `opacity: imgLoaded ? 1 : 0` and `onLoad` state from CatalogCard — images appear immediately with no JS opacity gate
- Use `open-proxy` pattern for dummyjson thumbnail URLs via a CSS background fallback OR switch to a reliable open API (Open Library / Unsplash placeholder with product data) so images actually load
- ResultCard in FindItemsPanel redesigned: larger image, full description, price prominently, "View & Order" button (links to `https://www.amazon.com/s?k=TITLE` as external link)
- TagUploadPanel shows price field (editable), source URL field, and payment info note
- CatalogEntry type extended with optional `price`, `sourceUrl` fields
- CatalogCard shows price and "Order / View Source" link button when those fields exist

### Remove
- `imgLoaded` state and `onLoad` / `style={{ opacity }}` from CatalogCard
- Hard dependency on dummyjson CDN images that fail ICP CSP — use `onerror` fallback to a local placeholder

## Implementation Plan
1. In CatalogCard: remove imgLoaded state, remove onLoad and opacity style — images show immediately
2. Extend CatalogEntry interface with `price?: string` and `sourceUrl?: string`
3. In CatalogCard: if entry.price exists, show price badge; if entry.sourceUrl exists, show "Order Now" external link button
4. In ResultCard: enlarge layout, show description, price prominently, add "View & Order" button linking to Amazon search for that product title, add onerror fallback on img tag
5. In TagUploadPanel: add editable price field, add sourceUrl field (pre-filled with Amazon search link), show order/payment note
6. In FindItemsPanel.handleUpload: include price and sourceUrl in the CatalogEntry passed to onAddEntry
