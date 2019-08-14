# Intercept Link Clicks

[![NPM Version](https://img.shields.io/npm/v/intercept-link-clicks.svg)](https://npmjs.org/package/intercept-link-clicks)
[![NPM Downloads](https://img.shields.io/npm/dm/intercept-link-clicks.svg)](https://npmjs.org/package/intercept-link-clicks)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

This module is mainly to intercept applicable link clicks for a single-page app router.  The options are geared toward intercepting internal links that should change the page state in some way.

## Install

```
$ npm install --save intercept-link-clicks
```

## Usage

```javascript
var interceptClicks = require('intercept-link-clicks');

interceptClicks(function(e, el) {
	// Change the page state here
	// `e` is the event object
	// `el` is the clicked link, which might be different from `e.target`
});
```

A more advanced usage is to pass options and an optional element:

```javascript
interceptClicks(document.querySelector('.my-el'), {
	// 
	// Leave all these as defauts:
	//
	// modifierKeys: true
	// download: true
	// target: true
	// hash: true
	// mailTo: true

	// Intercept all clicks, even ones that are not same origin
	sameOrigin: false
}, function(e, el) {
	// Change the page state here
});
```
