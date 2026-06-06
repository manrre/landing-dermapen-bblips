# Hotmart Link Rules

## Official Concepts

Hotmart calls affiliate promotional URLs "Hotlinks" or "Links de Divulgacion". They are generated with unique tracking codes that identify the promoter and product so sales can be attributed and commissions distributed.

Common Hotlink types:

- Sales Page link: sends visitors to a Hotmart product/sales page.
- Product Page link: sends visitors to an external producer sales page if configured, otherwise to Hotmart Marketplace/product page.
- Checkout Page link: sends visitors directly to checkout when the creator made it available to affiliates.
- Custom Checkout Page link: sends visitors to a customized checkout variant when available.
- Additional links: creator-provided pages, offers, plans, checkout pages, or custom checkout pages that are reflected for affiliates with individual tracking.

## Attribution Rules

Hotmart tracking is cookie-based after the buyer clicks the affiliate Hotlink. The cookie duration depends on creator configuration, such as 60, 90, 180 days, or indefinitely.

Do not copy and promote the final destination URL after a redirect if it has lost the affiliate Hotlink context. Always promote the affiliate promotional link supplied by Hotmart or the creator.

Some programs attribute commissions by last click, first click, or multiple clicks depending on creator rules. Treat "last click" as the default risk model unless product rules say otherwise: later affiliate clicks may overwrite earlier attribution.

## Parameters

### SRC

Use `src` for affiliate campaign/source tracking.

Examples:

```text
https://go.hotmart.com/I105893773O?src=meta-co
https://go.hotmart.com/I105893773O?ap=1e61&src=meta-co-hero-a
https://go.hotmart.com/I105893773O?dp=1&src=ig-co-bio
```

Rules:

- Use `?src=` if there are no existing query parameters.
- Use `&src=` if the URL already has `?ap=`, `?dp=`, `?ref=`, or another parameter.
- Keep the code under 30 characters.
- Do not use underscores; Hotmart says underscore is reserved for internal system use.
- Pipes can separate campaign dimensions, but for ad platforms and URL handling a hyphenated code is usually safer.

### UTM

UTMs are useful for Google Analytics, Meta reporting, and external analytics:

```text
&utm_source=meta&utm_medium=paid_social&utm_campaign=dermapen_bblips_co
```

For Hotmart affiliate reporting, do not rely only on UTM. Include `src` too.

### SCK

Hotmart describes `sck` as a checkout-source parameter primarily for creators tracking campaigns that go directly to payment pages. For affiliate Hotlinks, prefer `src` unless the producer or Hotmart account context explicitly requires `sck`.

### Existing Offer Parameters

Preserve:

- `ap`: often identifies an additional link, offer, checkout variant, upsell/order-bump path, or custom path configured by creator.
- `dp`: often indicates direct payment or product-page behavior depending on Hotmart route.
- `ref`: affiliate reference code on producer/external sales pages.
- `off`: checkout offer code.
- `checkoutMode`: checkout display mode.

Do not infer that two links with the same product code are equivalent. Different `ap`/`off` values may show different prices or upsell flows.

## Link Classification Heuristics

- `go.hotmart.com/CODE`: affiliate Hotlink. Preserve it.
- `go.hotmart.com/CODE?dp=1`: often product/marketplace or direct payment route; inspect before using.
- `go.hotmart.com/CODE?ap=xxxx`: additional link or offer variant. Inspect price and destination.
- `pay.hotmart.com/...`: checkout URL. If supplied directly by user, preserve it; if obtained after redirect, verify affiliate attribution before using.
- Producer domain with `?ref=CODE`: external sales page carrying affiliate reference. Useful as official landing reference, but not always best for paid traffic.

## Recommended Landing Pattern

For custom landing pages:

1. Receive traffic with UTMs on your own domain.
2. Store landing variant, campaign, ad id, and click id locally.
3. Fire local `ViewContent` and `Lead`/`InitiateCheckout` events as appropriate.
4. Redirect CTA to the selected Hotmart affiliate link with `src`.
5. If webhook access exists, reconcile Hotmart approved purchases by `purchase.origin.src`, `affiliates.affiliate_code`, product id/name, and transaction id.

## Webhook Notes

Hotmart webhook purchase events can include:

- `affiliates[].affiliate_code`
- `affiliates[].name`
- `purchase.origin.src`
- `purchase.origin.sck`
- `purchase.origin.xcod`
- `purchase.checkout_country.iso`
- `purchase.status`
- `purchase.transaction`
- `purchase.order_bump.is_order_bump`
- `purchase.order_bump.parent_purchase_transaction`

Webhook access may depend on account permissions and whether the user is the creator, co-creator, or has integration access. Affiliates often cannot rely on producer-side webhook access unless granted.

## User's Dermapen + BBLips Links

Preserve these as affiliate links:

```text
https://yesslacroixacademy.com/curso-online-dermapenbblips/?ref=I105893773O
https://go.hotmart.com/I105893773O?dp=1
https://go.hotmart.com/I105893773O?ap=86c5
https://go.hotmart.com/I105893773O?ap=7e34
https://go.hotmart.com/I105893773O?ap=1e61
```

Observed in June 2026:

- The producer landing page showed "Curso Online DermapenBBLips" and a low-price offer around USD 10.
- `ap=7e34` reached the Yess Lacroix Academy catalog/home page.
- `dp=1` reached a Hotmart product/marketplace-style page for Dermapen + BB Lips.
- `ap=86c5` and `ap=1e61` reached Hotmart checkout-style pages, but dynamic rendering may be needed to confirm final price and upsell behavior.

For Colombia paid traffic, start with a direct checkout variant (`ap=1e61` or `ap=86c5`) and test one against the other. Avoid catalog as the main CTA for cold traffic.

## Sources Consulted

- Hotmart Help Center: "What are Promotional Links and how to share them?"
- Hotmart Help Center: "How does the tracking process of Promotional Links (HotLinks) work?"
- Hotmart Help Center: "How can I track the source of my sales on Hotmart?"
- Hotmart Help Center ES: "Que significa ser Afiliado y como puedo empezar?"
- Hotmart Help Center ES: "Como configuro la API de mi producto usando el Webhook (Postback)?"
- Hotmart Developers: Webhook purchase events v2.0.0.
