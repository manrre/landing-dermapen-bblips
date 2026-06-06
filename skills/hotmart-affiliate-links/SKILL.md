---
name: hotmart-affiliate-links
description: Use when auditing, planning, generating, testing, or explaining Hotmart affiliate links, HotLinks, checkout variants, SRC/UTM tracking, sales-page vs checkout links, order bumps, upsells, or Meta Ads landing-page CTAs that must preserve affiliate commission attribution.
---

# Hotmart Affiliate Links

## Overview

Use this skill to operate Hotmart affiliate links without breaking commission attribution. Treat the user's Hotmart URLs as revenue-critical tracking assets: preserve the affiliate code and existing offer parameters, then add campaign tracking deliberately.

For detailed rules, examples, and source notes, read `references/hotmart-link-rules.md`.

## Core Rules

1. Never replace a user's Hotmart affiliate URL with a "clean" product, checkout, marketplace, or producer URL.
2. Preserve the Hotlink code, `ref`, `ap`, `dp`, `off`, `checkoutMode`, and any existing query parameters unless the user explicitly asks to test a different variant.
3. For affiliate campaign tracking, prefer Hotmart's `src` parameter.
4. Use `?` only for the first query parameter and `&` for every later one.
5. Keep `src` values under 30 characters, avoid underscores, and use readable short codes.
6. For paid media, keep Meta/Google UTMs too when needed, but do not rely on UTMs alone for Hotmart affiliate reporting.
7. Before recommending a link, classify it as sales page, product page/marketplace, direct checkout, custom checkout, catalog, upsell/order-bump flow, or unknown.
8. For conversion pages, use one primary checkout destination per variant to keep testing clean.

## Workflow

### 1. Inventory Links

For each URL, record:

- Original URL exactly as provided.
- Destination type after inspection.
- Existing affiliate identifiers and offer parameters.
- Visible price or offer claim, if available.
- Recommended use: cold traffic, retargeting, catalog, test-only, or avoid.

### 2. Build Campaign Links

Append `src` to the original affiliate URL:

```text
https://go.hotmart.com/I105893773O?ap=1e61&src=meta-co-hero-a
```

Use naming like:

- `meta-co-hero-a`
- `meta-co-hero-b`
- `ig-co-story`
- `wa-co-followup`
- `ret-co-7d`

Do not use underscores. Keep names concise.

### 3. Landing Page CTA Strategy

For a custom landing page:

- Use the user's selected affiliate checkout URL as the CTA.
- Fire local analytics/Meta events before redirecting.
- Store the selected landing variant and append matching `src`.
- Avoid sending paid traffic to catalog pages unless the campaign goal is browsing.

### 4. Attribution Checks

When testing manually:

- Open the final URL in a clean browser session.
- Confirm the payment page still shows the expected product/offer.
- On the Hotmart checkout, check the `REF` indicator when visible; it should match the affiliate reference code.
- Do not test with producer links or copied final checkout URLs that lost the affiliate Hotlink.

### 5. Reporting

Use Hotmart's Sales Source Dashboard to compare `SRC` values. For external analytics, compare:

- Landing page visits.
- CTA clicks.
- Hotmart `src` sales.
- Meta campaign/ad set/ad ids.
- Hotmart status: approved, refunded, chargeback, order bump, upsell where available.

## Colombian Campaign Defaults

When planning for Colombia:

- Show the offer in USD and optionally add "valor aproximado en COP segun tasa de Hotmart/banco".
- Prefer checkout links over catalog links for cold conversion campaigns.
- Mention payment methods only after checking the current checkout.
- Keep claims compliant: sell training and business opportunity, not guaranteed medical or income outcomes.

## When To Read The Reference

Read `references/hotmart-link-rules.md` when:

- The user gives multiple Hotmart URLs.
- You need to add tracking parameters.
- You need to explain `src`, `sck`, UTM, cookies, affiliate attribution, or webhook fields.
- You are designing a landing/ads funnel where Hotmart is the checkout.
