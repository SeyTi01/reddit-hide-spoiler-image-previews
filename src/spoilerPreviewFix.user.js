// ==UserScript==
// @name         Reddit: Hide Spoiler Image Previews
// @namespace    https://github.com/SeyTi01/
// @version      1.5
// @description  Hides visible spoiler image previews on new Reddit.
// @author       SeyTi01
// @match        https://www.reddit.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const config = {
        iconClass: '_3CquMWJ6RMh8E9D-_84AtZ _2hIvPRO2xz4rn9LXAJXYDa _10qSZsDWnOBwx4bc7GJ1QF icon icon-media_gallery',
        imageSelector: 'div[aria-label][data-click-id="image"]',
        backgroundDivSelector: 'div[data-click-id="background"]',
        spoilerSelector: 'span._1wzhGvvafQFOWAyA157okr, span._1P0ASR__enq34IxkSim2Rk',
    };

    const iconContainer = createIconContainer(config.iconClass);
    const observer = new MutationObserver(observeMutations);

    function hideSpoilerImage(image) {
        const spoilerSpan = image.closest(config.backgroundDivSelector).querySelector(config.spoilerSelector);
        if (spoilerSpan) {
            image.replaceWith(iconContainer.cloneNode(true));
        }
    }

    function observeMutations(mutations) {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.querySelectorAll(config.imageSelector).forEach(hideSpoilerImage);
                    }
                });
            }
        }
    }

    function createIconContainer(iconClass) {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = iconClass;
        container.appendChild(icon);
        return container;
    }

    document.querySelectorAll(config.imageSelector).forEach(hideSpoilerImage);
    observer.observe(document.body, { childList: true, subtree: true });
})();