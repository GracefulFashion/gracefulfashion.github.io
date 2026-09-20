# SiteEdit: merchant content files

This folder contains the content that can be edited without touching the app machinery. The site loads these files when it opens and keeps its built-in content as a fallback.

## Files

- `Home.json` — home-page wording, hero/story images and text, collection heading, and contact copy.
- `Accessories.json`, `Blouses.json`, `Combos.json`, `Dresses.json`, `Pants.json`, `Shirts.json`, `Shorts.json`, `Skirts.json`, `Vests.json` — one collection page each.

## Editing products

Inside a category file, edit the `products` list. To remove a product, delete its whole `{ ... }` entry. To add a product, copy an existing product entry and change its values. Keep `id` unique, use an image path beginning with `/assets/`, and keep at least one value in `sizes`.

A numeric `price` is used for cart totals. `priceLabel` is the visible text shown on product cards. Use `"price": null` for a price-on-request item and set a friendly `priceLabel`, such as `"Price on request"` or `"Priceless"`.

## Editing categories

Change `label` to change the home-page card label, `description` to change the category-page introduction, and `image` to change the home-page card image. The `slug` should normally stay unchanged because it is part of the page URL.

## Editing safely

JSON is strict: use double quotes, do not add comments, and keep commas between entries but not after the last entry. After editing, check the file with a JSON validator before committing. Product image files still need to be uploaded into the matching folder under `assets/`.
