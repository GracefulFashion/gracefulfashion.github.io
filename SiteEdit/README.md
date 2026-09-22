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

## Page colors

Edit the `colors` object in `Home.json` to change the main page palette. Use six-digit CSS hex colors. Available fields are `background`, `foreground`, `primary`, `primaryForeground`, `secondary`, `secondaryForeground`, `border`, `muted`, `mutedForeground`, `accent`, and `accentForeground`. Omit a field to keep the built-in color. Collection-category card colors are controlled only by each category file's `titleColor` and `backgroundColor` in `SiteEdit/Categories/<Category>/<Category>.json`; do not use the homepage `colors` object for those cards.

## Contact information

Edit `contact.links` in `Home.json` to change the contact buttons. Each entry uses `type`, `label`, and `url`; use `type: "email"` for an email link, and use other types such as `whatsapp`, `tiktok`, or `facebook` for links that open in a new tab. You can add, remove, reorder, or rename entries.

## Editing safely

JSON is strict: use double quotes, do not add comments, and keep commas between entries but not after the last entry. After editing, check the file with a JSON validator before committing. Product image files belong in the matching category folder beside its JSON file. The `image` value should use the category folder path, such as `/SiteEdit/Blouses/green_blouse.webp`. The `dropsizes` menu stays open while the page is scrolled or a drag is in progress, and closes when blank space is clicked or tapped.
## Checkout settings

The public checkout settings are in `SiteEdit/cart.json`. You may edit the backend base URL, provider label, currency display settings, checkout availability, test-mode indicator, store name, button text, email-field text, and checkout note. The frontend appends `/api/initialize-payment` to `backendUrl`. Product prices and the cart subtotal remain in kobo and are sent directly to the backend without conversion.

**Never put a Paystack secret key, public key, token, password, or other private credential in `SiteEdit/cart.json` or anywhere in this repository.** The Paystack secret remains exclusively in Vercel as the `PAYSTACK_SECRET_KEY` environment variable. The `testMode` setting is informational only and does not select credentials.
