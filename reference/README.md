# Static prototype

The plain HTML and CSS build the Next app was ported from, kept as the
reference for the eventual WordPress theme: every `<section>` in `index.html`
carries a comment naming the partial it maps to (`section-hero.php`,
`section-carts.php`, and so on).

Images and fonts were removed from here because they are duplicates. The
canonical copies are in `public/img/` and `app/fonts/`. To open this file
standalone, point `assets/img` and `assets/fonts` at those directories.

This folder is excluded from linting and is not part of the build.
