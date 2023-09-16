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

    const SELECTORS = {
        iconClass: '_3CquMWJ6RMh8E9D-_84AtZ _2hIvPRO2xz4rn9LXAJXYDa _10qSZsDWnOBwx4bc7GJ1QF icon icon-media_gallery',
        imageDiv: 'div._2c1ElNxHftd8W_nZtcG9zf',
        spoilerSpan: 'span._1wzhGvvafQFOWAyA157okr, span._1P0ASR__enq34IxkSim2Rk',
        backgroundClosest: '._1poyrkZ7g36PawDueRza-J'
    };

    const iconContainer = createIconContainer(SELECTORS.iconClass);
    const observer = new MutationObserver(observeMutations);

    document.querySelectorAll(SELECTORS.imageDiv).forEach(hideSpoilerImage);
    observer.observe(document.body, { childList: true, subtree: true });

    function observeMutations(mutations) {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    handleAddedNode(node);
                });
            }
        }
    }

    function handleAddedNode(node) {
        if (node instanceof HTMLElement) {
            hideSpoilerImage(node.querySelector(SELECTORS.imageDiv));
        }
    }

    function hideSpoilerImage(image) {
        const background = image.closest(SELECTORS.backgroundClosest);
        const spoilerSpan = background.querySelector(SELECTORS.spoilerSpan);
        if (spoilerSpan) {
            image.replaceWith(iconContainer.cloneNode(true));
        }
    }

    function createIconContainer(iconClass) {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = iconClass;
        container.appendChild(icon);
        return container;
    }
})();