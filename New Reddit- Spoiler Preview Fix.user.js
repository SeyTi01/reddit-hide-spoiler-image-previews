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

    function replaceImages() {
        let images = document.querySelectorAll('div[aria-label][data-click-id="image"]');

        for (let image of images) {
            let iconDiv = image.querySelector('div > i.icon');
            if (iconDiv) continue;

            let spoilerSpan = image.closest('div[data-click-id="background"]').querySelector('span._1wzhGvvafQFOWAyA157okr');
            if (!spoilerSpan) continue;

            let div = document.createElement('div');
            div.className = image.className;
            div.style = image.style;

            let icon = document.createElement('i');
            icon.className = '_3CquMWJ6RMh8E9D-_84AtZ _2hIvPRO2xz4rn9LXAJXYDa _10qSZsDWnOBwx4bc7GJ1QF icon icon-media_gallery';

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