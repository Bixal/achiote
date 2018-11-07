# Achiote (WIP)
Bixal's Drupal 8 starter theme.

Trivia: "Achiote" is the name of the plant whose scientific name (_Bixa orellana_) provided inspiration for Bixal's name.

## To Get Started:

1. If they aren't already, make sure that node and npm (Node Package Manager) are [installed](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm). If you are using a Mac, Homebrew is recommended for this.
2. If this is your first time ever using gulp, you will need to install it globally by running `npm install -g gulp` so that the terminal recognizes gulp commands.
3. The first time running this particular project, `cd` into this directory and type `npm install`
4. To continually watch .scss and .js files for changes, type `gulp` and use `ctrl + C` to stop.
5. To run a one-time compilation of .scss files, type `gulp scss`

*Note:* You'll need the [livereload browser extension](http://livereload.com/extensions/) to automatically refresh on changes.

## Guidelines:

* In general, all units should use the `px-to-rem()` described in scss/base/_functions.scss
* With rare case-by-case exceptions, bitmap sprites should never be used.
* For multi-color illustrations for which a bitmap sprite might often be used, use an SVG sprite instead if at all possible.
* Do not nest your CSS selectors, except for states (:hover, etc.), pseudoelements(:before, :after), or pseudo-selectors (:nth-child, etc.). While SCSS provides this functionality, it can easily get out of control creating hard-to-read code and unwieldy selectors.
* All styling should be done mobile-first. This repo contains a mixin for the `min-width` media query only, which in the vast majority of cases should be all you need.
* When in doubt, break your code out into its own partial. You can add partials by first creating the partial and then importing it from _components.scss, _base.scss, _layout.scss, or _global.scss. In the majority of cases, it will belong in components. Do not put partials outside of these folders.


## Generating Icons
* Add your icons to `images/icons/` and run the `gulp icons` task.
  This will optimize your SVGs and create an icon font with scss partial.
* Tip: If your icons seem tiny or invisible despite normal font sizes, make sure that none of the svg files have `width="100%"` and/or `height="100%"` on the `<svg>` tag. In a pinch, if you're not sure what part of your svg's code is messing up your font, try uploading the svgs to icomoon.io and re-downloading them.

## Sass-lint
Sass-lint accepts `YML` or `JSON` files. Config needs to be in project root unless you specify in `package.json`.

If you need to ignore a rule use: `// sass-lint:disable <rule>, <rule>` and include a reason.

[Docs here](https://github.com/sasstools/sass-lint/tree/develop/docs)

---

Screenshot image: ["Achiote (bixa orellana)"](https://www.flickr.com/photos/missy-and-the-universe/3493687779/in/photolist-6jJ4Ec-21RRh17-dJARfG-sstPg-6a9Se6-rtovr-b8v5pz-t8cDMZ-eLqB2e-2a3kLPK-bn5e8Z-6BZfPz-sstHG-gFXVs3-aTveG-6jJ3zT-pmnJK8-NR7uFm-6rdZ4T-dMwxYo-p4SvNK-bAAJGg-7S5VNT-e7qnzh-6a9SdZ-DQ23q4-dRYMoZ-DTLehr-DrbesP-6Y4G8h-EfkkeX-85jZ6a-8iviH5-rd6Ph-c1kn3m-DrDW9G-DrbduB-DqMeMy-7PyqfG-DTLd4V-5VNNyc-b8VEqg-DKwc2s-7S5Vrn-Dr7VYr-MdLLiX-JV9Mnn-23bi23N-MdLJJ4-yKCYp8 ) by [missy](https://www.flickr.com/people/missy-and-the-universe/) is licensed under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/legalcode) / Cropped from original
