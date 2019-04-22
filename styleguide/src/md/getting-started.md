---
name: Getting Started
category: Getting Started
---

There's a gulp task called `styelguide` that's run after styles have been updated
and/or after the `styleguide/src/md/` files have been updated.

It's highly recommended you update the styleguide's sidebar logo and colors to match your
theme.

You should also probably change this file to give a brief introduction to the project.

## Using with Drupal

There's this [package](https://packagist.org/packages/bixal/style_guide_response).
That you can use with your drupal sites. But you have to rename your generated
styleguide `index.html` to `style-guide.html`.

## Files

##### `Root:`

- `stylemark.yml`

  Configuration file. You can update the styleguide logo, set theme
  assets from where it will generate the styleguide, order the
  styleguide links in the sidebar. You can also specify the assetes for the
  styleguide's theming.

* `styleguide/`
  Styleguide assets, dist contains generated code.

  - `dist/` **Don't Modify**

  - `src/`

    - `css/`

      Styleguide theming.

    - `md/`

      Markdown files where your styleguide components will live.
