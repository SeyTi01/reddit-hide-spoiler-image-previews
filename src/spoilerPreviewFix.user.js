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
        image: 'div._2e9Lv1I3dOmICVO9fg3uTG',
        spoiler: 'span._1wzhGvvafQFOWAyA157okr, span._1P0ASR__enq34IxkSim2Rk',
        background: '._1poyrkZ7g36PawDueRza-J'
    };

    const iconClass = '_3CquMWJ6RMh8E9D-_84AtZ _2hIvPRO2xz4rn9LXAJXYDa _10qSZsDWnOBwx4bc7GJ1QF icon icon-media_gallery';
    const iconContainer = createIconContainer(iconClass);
    const observer = new MutationObserver(observeMutations);

    document.querySelectorAll(SELECTORS.image).forEach(hideSpoilerImage);
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
            node.querySelectorAll(SELECTORS.image).forEach(hideSpoilerImage);
        }
    }

    function hideSpoilerImage(image) {
        const spoilerSpan = image.closest(SELECTORS.background).querySelector(SELECTORS.spoiler);
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