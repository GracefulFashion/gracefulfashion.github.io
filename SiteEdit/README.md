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

## Editing categories

Change `label` to change the home-page card label, `description` to change the category-page introduction, and `image` to change the home-page card image. The `slug` should normally stay unchanged because it is part of the page URL.

## Formatting the homepage intro

The `hero.intro` value supports a small set of safe formatting tags: `<b>...</b>` or `<strong>...</strong>` for bold, `<u>...</u>` for underline, `<i>...</i>` or `<em>...</em>` for italics, and `<br>` for a line break. Do not use arbitrary HTML or attributes. For example: `"intro": "Soft <b>pieces</b><br>for every day."`

## Editing safely

JSON is strict: use double quotes, do not add comments, and keep commas between entries but not after the last entry. After editing, check the file with a JSON validator before committing. Product image files belong in the matching category folder beside its JSON file. The `image` value should use the category folder path, such as `/SiteEdit/Blouses/green_blouse.webp`. The `dropsizes` menu stays open while the page is scrolled or a drag is in progress, and closes when blank space is clicked or tapped.
