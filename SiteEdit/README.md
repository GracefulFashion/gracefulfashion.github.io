# SiteEdit: merchant content files

This folder contains the content that can be edited without touching the app machinery. The site loads these files when it opens and keeps its built-in content as a fallback.

## Files

- `Home.json` — home-page wording, hero/story images and text, collection heading, and contact copy.
- `Accessories/`, `Blouses/`, `Combos/`, `Dresses/`, `Makeup/`, `Pants/`, `Shirts/`, `Shoes/`, `Shorts/`, `Skirts/`, `Vests/` — one folder per collection. Each contains its product JSON file and product images.
- `Categories/` — **advanced category-card configuration for the site owner.**

> **Don't touch the `SiteEdit/Categories` folder unless you know what you're doing.**

The `Categories/index.json` file controls which collection cards appear on the home page and their order. Each entry points to a matching folder and category-card JSON file. To add or remove a collection card, create or remove its matching folder and add or remove its entry in `index.json`; copy an existing category-card JSON file as a starting point, then update its `folder`, `productsFile`, `slug`, `label`, `title`, `titleColor`, `backgroundColor`, `description`, and `image` paths. Put `titleColor` and `backgroundColor` directly below `title`; use CSS hex colors such as `#864f5d` and `#fffaf8`. The category-card `image` should point to an image in the matching product folder, such as `/SiteEdit/Blouses/green_blouse.webp`. The `productsFile` should point to that collection's product JSON file. Keep `slug` stable after the page is published because it is part of the collection URL.

## Editing products

Inside each category folder, open the category JSON file and edit its `products` list. To remove a product, delete its whole `{ ... }` entry. To add a product, copy an existing product entry and change its values. Keep `id` unique and use an image path beginning with `/SiteEdit/`. For normal apparel sizes, use `"sizes": ["S","M","L","XL"]`; these appear as buttons. For footwear or any product that needs a menu, use `"dropsizes": ["35","36","37","38"]` instead; these appear in a dropdown. Do not use both fields on the same product. A product with neither field does not require a size before adding to cart.

The numeric `price` is stored in **kobo**. The site divides it by 100 and displays it as naira with two decimals, so `3000000` displays as `₦30,000.00`. You no longer need `priceLabel`; delete it if present. Use `"price": null` for a price-on-request item; it displays as `Price on request` on the product card and in the cart.

## Collection page colors

Each product collection file, such as `SiteEdit/Blouses/Blouses.json`, has its own `colors` object for that collection page. These colors affect the collection page only. Edit the six-digit CSS hex values for `background`, `foreground`, `primary`, `primaryForeground`, `secondary`, `secondaryForeground`, `border`, `muted`, `mutedForeground`, `accent`, `accentForeground`, and `pageHero`. This is separate from `SiteEdit/Categories/<Category>/<Category>.json`, whose `titleColor` and `backgroundColor` control the homepage collection card.

## Editing categories

Change `label` to change the home-page card label, `description` to change the category-page introduction, and `image` to change the home-page card image. The `slug` should normally stay unchanged because it is part of the page URL.

## Formatting the homepage intro

All editable SiteEdit text values support a small set of safe formatting tags, including homepage text, category titles and descriptions, product names, story paragraphs, contact labels, and cart product names. The `hero.intro` value is one example. Supported tags: `<b>...</b>` or `<strong>...</strong>` for bold, `<u>...</u>` for underline, `<i>...</i>` or `<em>...</em>` for italics, and `<br>` for a line break. Do not use arbitrary HTML or attributes. For example: `"intro": "Soft <b>pieces</b><br>for every day."`

## Button colors and opacity

Each color-bearing SiteEdit file also accepts a `colors.buttons` object with `default`, `hover`, `pressed`, and `disabled` states. Each state has `background`, `foreground`, `border`, and `opacity` fields. The button states control the primary page buttons and the product-card Add to cart states. (The cart page and payment-result page buttons have their own settings in `SiteEdit/cart.json`; see "Cart page and payment-result page styling" below.) Opacity values range from `0` (transparent) to `1` (fully opaque).

Every palette color may also have a matching opacity field, such as `backgroundOpacity`, `primaryOpacity`, or `borderOpacity`, with a value from `0` to `1`. These are optional and default to `1`, so existing color files continue to look the same. Category-card files additionally support `backgroundColorOpacity` and `titleColorOpacity`.

## Page colors

Edit the `colors` object in `Home.json` to change the main page palette. Use six-digit CSS hex colors. Available fields are `background`, `foreground`, `primary`, `primaryForeground`, `secondary`, `secondaryForeground`, `border`, `muted`, `mutedForeground`, `accent`, and `accentForeground`. Omit a field to keep the built-in color. Collection-category card colors are controlled only by each category file's `titleColor` and `backgroundColor` in `SiteEdit/Categories/<Category>/<Category>.json`; do not use the homepage `colors` object for those cards.

## Contact information

Edit `contact.links` in `Home.json` to change the contact buttons. Each entry uses `type`, `label`, and `url`; use `type: "email"` for an email link, and use other types such as `whatsapp`, `tiktok`, or `facebook` for links that open in a new tab. You can add, remove, reorder, or rename entries.

## Editing safely

JSON is strict: use double quotes, do not add comments, and keep commas between entries but not after the last entry. After editing, check the file with a JSON validator before committing. Product image files belong in the matching category folder beside its JSON file. The `image` value should use the category folder path, such as `/SiteEdit/Blouses/green_blouse.webp`. The `dropsizes` menu stays open while the page is scrolled or a drag is in progress, and closes when blank space is clicked or tapped.
## Checkout settings

The public checkout settings are in `SiteEdit/cart.json`. You may edit the backend base URL, provider label, currency display settings, checkout availability, test-mode indicator and store name at the top of that file. Button text, headings, the checkout note and all colours are edited inside the groups described in the next section. The frontend appends `/api/initialize-payment` to `backendUrl`. Product prices and the cart subtotal remain in kobo and are sent directly to the backend without conversion.

**Never put a Paystack secret key, public key, token, password, or other private credential in `SiteEdit/cart.json` or anywhere in this repository.** The Paystack secret remains exclusively in Vercel as the `PAYSTACK_SECRET_KEY` environment variable. The `testMode` setting is informational only and does not select credentials. The cart is intentionally not cleared when checkout initialization begins; it remains available until payment is confirmed by the backend/payment flow.

## Checkout form fields (customer details, pickup and delivery)

The checkout form's wording and boxes are in `SiteEdit/cart.json`. Each key that starts with `$comment` is a plain-English note to you: leave the notes in place, the site ignores them.

- `customerFields` and `addressFields` are lists of boxes. Each `{ ... }` is one box, shown in list order. To change a label, edit its `label`. To make a box optional, set `"required": false`. To add a box, copy an existing `{ ... }`, give it a **new** `key` made of letters only, and it will be saved with the order. To remove a box, delete its whole `{ ... }`. Do not delete or rename the `key` of these, because the server needs them: `name` and `phone` (customer), and `recipientName`, `recipientPhone`, `state`, `town` (delivery address). `neighbourhood`, `street`, `landmark` and `directions` may be made optional or removed from view, but keep their `key` spelling if you keep them.
- `"required": "local"` (used by `neighbourhood`) means required only for towns marked `"local": true`.
- `deliveryMethods` are the two big Pickup / Delivery choices. Change the `label` and `description` freely, but never the `key` values `pickup` and `delivery`.
- Everything else near them (`customerSectionTitle`, `sameAsCustomerLabel`, error messages and so on) is plain wording.

The **lists of states, towns and pickup sites are not in this repository**. They live in the private backend repository in `DeliveryEdit/areas.json`. Adding a GIG Logistics or Post Office pickup site, or a new town, is done there.

Phone numbers are checked by the server. The checkout form only shows hints. Personal details entered in this form are sent to the backend when the customer pays; they are never stored in the customer's browser and never sent to Paystack.

## Cart page and payment-result page styling

`SiteEdit/cart.json` is organised as groups that follow the page from the top down: `basePalette`, `cartHeading`, `cartItems`, `orderSummary` (with `formColors` and `payButton` inside it), the checkout form wording block, `emptyCart`, and `paymentStatusPage`. Inside each group the words come first, then every colour with its opacity on the very next line, so `titleColor` is always followed by `titleOpacity`. Opacity runs from `0` (invisible) to `1` (solid). Colours are six-digit codes such as `#4b303b`.

Buttons sit inside the group of the section they belong to (the Continue shopping button inside `cartHeading`, the Pay button inside `orderSummary`, and the payment-result page's own Continue shopping button inside `paymentStatusPage`). Each button has a `text` and then colour sets: `normal` (resting), `hover` (mouse over), and for the Pay button also `pressed` (while checkout starts) and `disabled` (not ready to pay). Every set has `backgroundColor`, `textColor` and `borderColor`, each followed by its opacity.

The quantity (+ / -) and Remove buttons on each cart item are not styled here; they use `basePalette`. The colour behind the whole page comes from `Home.json`. The space above and below the payment-result page's Continue shopping button is fixed at 3rem in the site style sheet and is not a SiteEdit setting.

## Fonts and font sizes (Home.json, cart.json and category files)

Under every text setting there are two lines: `...Font` and `...FontSize`, followed by that text's colour and opacity. `"default"` keeps the site's current look exactly as it is.

To change a font, type its name exactly as it appears on fonts.google.com (for example `Playfair Display` or `Great Vibes`). These 14 load fastest because they are fetched together: Instrument Serif, DM Sans, Inter, Playfair Display, Cormorant Garamond, Lora, Libre Baskerville, DM Serif Display, Poppins, Montserrat, Raleway, Nunito, Great Vibes, Dancing Script. Any other Google font is fetched on its own, in its regular weight (bold text in it is thickened by the browser). If Google does not have a font by that name (a typo, for example), that text keeps its normal font and the Vercel logs say which file named which font.

A font size is a number with a unit such as `1.5rem` or `24px` (rem, em, px, vw, vh and % work); it then applies at every screen width. Anything that is not a valid size is ignored.


## Home.json

Groups run from the top of the page down, after two site-wide groups: `errors`, `floatingHeader`, `basePalette`, `otherButtons`, `topBar`, `navigation`, `hero`, `marquee`, `collection`, `about`, `contact`, `footer`. The top bar, navigation and footer appear on every page, so their words and colours here apply to all pages. The order of groups and lines does not matter to the site (it finds each setting by name); it is only kept tidy so things are easy to find.

- `errors`: the error picture, the "Temporarily Unavailable" words, and their font, size, colour and opacity. These are used everywhere the words appear: home page cards, category pages and product cards. `homeTilePanelColor` and its opacity are the pale panel behind the words on a home page card.
- `floatingHeader`: `"enabled": true` keeps the dark top bar and the white logo/links bar at the top of the screen while scrolling; `false` lets them scroll away. If the line is missing or not true/false, the header does not float and the mistake is written to the Vercel logs.
- `otherButtons`: colours, font and size for buttons that have no settings of their own (for example the page-not-found button).
- `marquee.bannerHeight` is `"default"` (today's height) or a height such as `3.5rem`.

The category cards under the collection heading are edited in the `Categories` folder, not here.

Where the buttons go: a home page category card opens that category at the top of its page. All collections (category pages) and Continue shopping (cart) return to the Collection section of the home page. The payment-complete page's Continue shopping goes to the top of the home page. The Collection, About and Contact links go to those sections, stopping just below the floating header, and Home goes to the very top. The browser's Back button returns to where you were.


## Category files

Each category has two files, named in `Categories/index.json`:

- `"folder"` names both folders: `SiteEdit/<folder>/` (products and photos) and `SiteEdit/Categories/<folder>/`. Lowercased, it is also the name the site asks the backend for, so its spelling must match the first word of that category's `loadCategory(...)` line in the backend's `lib/catalog-data.js`. Capitals may differ.
- `"file"` names both JSON files: `SiteEdit/<folder>/<file>` and `SiteEdit/Categories/<folder>/<file>`. Rename the two files together and change `"file"` to match. If `"file"` is missing, that category shows Temporarily Unavailable and the Vercel logs say so.

`SiteEdit/Categories/<folder>/<file>` holds the category's words and home page card: `slug` (the page address), `label`, `title`, `description`, `image`, and the card's title and background colours.

`SiteEdit/<folder>/<file>` holds only the `products` list and one block called `categoryPageStyle`. Each product's `"id"` must match an `"id"` in the backend's CatalogEdit file exactly. The `categoryPageStyle` block is identical for every category: to style every category the same way, copy the whole block from one file and paste it over the matching block in the others.


## Stock wording on product cards and in the cart

The product card and cart show live stock from the backend. All of this wording has a built-in default, so nothing below has to be added. To change a word, add the line to the matching group.

- **Product cards** (add inside a collection file's `productCards` group): `stockSelectSizeText` ("In Stock: Select a size"), `stockCountText` ("In Stock: {n}", where `{n}` becomes the number), `soldOutText` ("Sold out"), and under `addButton`: `maxInCartText` ("Maximum in cart").
- **Cart items** (`cart.json`, `cartItems` group): `stockLimitText`, `maxPerItemText`, `contactLinkText`, `cartUpdatedPrefixText`, `stockChangedText`, `cartUpdatedText`.
- **Order summary** (`cart.json`, `orderSummary` group): `deliveryLabelText` (Delivery Fee), `deliveryPromptText`, `noDeliveryFeeText`, `taxLabelText`, `taxIncludedText`, `vatIncludedText` (`{percent}` becomes the rate) and `totalLabelText`.

The most of one item a customer can order (default 10) is set in the BACKEND file `CatalogEdit/limits.json`, not here. Sizes with no stock cannot be picked. Delivery fees and tax rates are set in the backend file `DeliveryEdit/areas.json`. Prices already include VAT, so the cart's Tax row only says Included.

## Products in several colours

A product sold in colours shows as ONE card with colour circles under the price. The colours themselves (their names, ids, prices and sizes) are set in the backend's `CatalogEdit` file; see `CatalogEdit/variantTemplate` there for every way to write one. Here, in the category's products list, each colour gets its photo and the colour of its circle, under the same colour id:

```json
{
  "id": "shoes-002",
  "variants": [
    { "id": "shoes-002-green", "image": "/SiteEdit/Shoes/leaf-lace-heels-green.jpg", "swatch": "#2f6b45" },
    { "id": "shoes-002-gold", "image": "/SiteEdit/Shoes/leaf-lace-heels-gold.jpg", "swatch": "#c9a54a" }
  ]
}
```

- `swatch` is a six-digit colour code. A colour with no swatch (or a mistyped one) shows a striped, dashed circle so it is easy to spot.
- The card opens on the first colour that has stock. Tapping a circle changes the photo, the title ("Leaf & Lace Heels — Gold"), the price, the sizes and the stock line. A colour sold out in every size shows faded with a line through it, but can still be tapped to see its photo.
- When some sizes cost more (`sizePrices` in CatalogEdit), the card shows "From ₦…" (the lowest price) until a size is picked, then that size's price. The words are `fromPriceText` in `categoryPageStyle` ({price} is replaced by the amount).
- Circle size, gap, border, the ring around the chosen colour and the sold-out line are in `categoryPageStyle` → `productCards` → `colorSwatches`. Phones fit 4 circles in one row at the default size, tablets about 6, computers about 8; more wrap onto a centred second row.

## When something can't be shown ("Temporarily Unavailable")

A mistake in one file no longer takes down the whole site:

- A category file with a mistake (a missing comma, for example) makes only that category show **Temporarily Unavailable**, on its home-page tile and its page. Every other category works.
- A product listed here whose id isn't in CatalogEdit (or has a mistake there) shows as a Temporarily Unavailable card with the error picture. The rest of the category works.
- A photo that can't be found shows the error picture instead.
- `Home.json`, `cart.json` and `Categories/index.json` are used by every page, so a mistake in one of them still shows the site's older built-in content, as before. It is now reported, though.

Visitors only see the words and picture set in `Home.json` → `errors` (`unavailableText` and `image`; the picture lives in the `assets` folder next to the roses). The details (which file, which line and column, or which product id) are written to the **Vercel logs** of the backend: Vercel dashboard → the backend project → Logs, and look for lines starting `SiteEdit error:` or `CatalogEdit error:`. Vercel keeps these logs for a short time only, so look soon after an edit; opening the broken page again sends the report again (at most once every 10 minutes for the same mistake).

Text from these files now keeps every space typed in it, so several spaces in a row show as several. A stray space at the start or end of a value will show too, which makes it easy to find. The scrolling banner keeps its spaces but never wraps.
