// ==UserScript==
// @name         New Reddit: Spoiler Preview Fix
// @namespace    https://github.com/SeyTi01/
// @version      1.0
// @description  Hides non-blurred spoiler image previews on New Reddit with gallery icons.
// @author       SeyTi01
// @match        https://www.reddit.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const ICON_CLASS = '_3CquMWJ6RMh8E9D-_84AtZ _2hIvPRO2xz4rn9LXAJXYDa _10qSZsDWnOBwx4bc7GJ1QF icon icon-media_gallery';
    const IMAGE_SELECTOR = 'div[aria-label][data-click-id="image"]';
    const SPOILER_SELECTOR = 'span._1wzhGvvafQFOWAyA157okr';

    let div = document.createElement('div');
    let icon = document.createElement('i');
    icon.className = ICON_CLASS;

    function replaceImages() {
        let images = document.querySelectorAll(IMAGE_SELECTOR);

        for (let image of images) {
            let iconDiv = image.querySelector('div > i.icon');
            if (iconDiv) continue;

            let spoilerSpan = image.closest('div[data-click-id="background"]').querySelector(SPOILER_SELECTOR);
            if (!spoilerSpan) continue;

            div.className = image.className;
            div.style = image.style;
            div.appendChild(icon);
            image.parentNode.replaceChild(div, image);
        }
    }

    replaceImages();

    let observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                replaceImages();
                break;
            }
        }
    });

    observer.observe(document.body, {childList: true});
})();