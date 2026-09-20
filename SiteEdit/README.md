# SiteEdit: merchant content files

This folder contains the content that can be edited without touching the app machinery. The site loads these files when it opens and keeps its built-in content as a fallback.

## Files

- `Home.json` — home-page wording, hero/story images and text, collection heading, and contact copy.
- `Accessories/`, `Blouses/`, `Combos/`, `Dresses/`, `Pants/`, `Shirts/`, `Shorts/`, `Skirts/`, `Vests/` — one folder per collection. Each contains its JSON file and the product images used by that collection.

## Editing products

Inside each category folder, open the category JSON file and edit its `products` list. To remove a product, delete its whole `{ ... }` entry. To add a product, copy an existing product entry and change its values. Keep `id` unique, use an image path beginning with `/assets/`, and keep at least one value in `sizes`.

A numeric `price` is used for cart totals. `priceLabel` is the visible text shown on product cards. Use `"price": null` for a price-on-request item and set a friendly `priceLabel`, such as `"Price on request"` or `"Priceless"`.

## Editing categories

Change `label` to change the home-page card label, `description` to change the category-page introduction, and `image` to change the home-page card image. The `slug` should normally stay unchanged because it is part of the page URL.

## Editing safely

JSON is strict: use double quotes, do not add comments, and keep commas between entries but not after the last entry. After editing, check the file with a JSON validator before committing. Product image files belong in the matching category folder beside its JSON file. The `image` value should use the category folder path, such as `/SiteEdit/Blouses/green_blouse.webp`.
