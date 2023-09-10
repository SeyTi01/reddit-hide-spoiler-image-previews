// ==UserScript==
// @name         Reddit: Hide Spoiler Image Previews
// @namespace    https://github.com/SeyTi01/
// @version      1.3
// @description  Hides visible spoiler image previews on new Reddit.
// @author       SeyTi01
// @match        https://www.reddit.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const ICON_CLASS = '_3CquMWJ6RMh8E9D-_84AtZ _2hIvPRO2xz4rn9LXAJXYDa _10qSZsDWnOBwx4bc7GJ1QF icon icon-media_gallery';
    const IMAGE_SELECTOR = 'div[aria-label][data-click-id="image"]';
    const BACKGROUND_DIV_SELECTOR = 'div[data-click-id="background"]';
    const SPOILER_SELECTOR = 'span._1wzhGvvafQFOWAyA157okr';

    let iconContainer = document.createElement('div');
    let icon = document.createElement('i');
    icon.className = ICON_CLASS;
    iconContainer.appendChild(icon);

    function replaceImages() {
        document.querySelectorAll(IMAGE_SELECTOR).forEach(image => {
            let spoilerSpan = image.closest(BACKGROUND_DIV_SELECTOR).querySelector(SPOILER_SELECTOR);
            if (spoilerSpan) {
                image.replaceWith(iconContainer.cloneNode(true));
            }
        });
    }

    function observeMutations(mutations) {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                replaceImages();
                break;
            }
        }
    }

    replaceImages();
    let observer = new MutationObserver(observeMutations);
    observer.observe(document.body, { childList: true });
})();