// ==UserScript==
// @name         Reddit: Hide Spoiler Image Previews
// @namespace    https://github.com/SeyTi01/
// @version      1.6
// @description  Applies blur effect to visible spoiler image previews on new Reddit
// @author       SeyTi01
// @match        https://www.reddit.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const SELECTORS = {
        image: 'div._2c1ElNxHftd8W_nZtcG9zf',
        spoiler: 'span._1wzhGvvafQFOWAyA157okr, span._1P0ASR__enq34IxkSim2Rk',
        background: '._1poyrkZ7g36PawDueRza-J'
    };

    const spoilerClass = 'GnWcY6GPzeZ5rzsiQ98fo';
    const observer = new MutationObserver(observeMutations);

    document.querySelectorAll(SELECTORS.image).forEach(applySpoilerStyles);
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
        if (node.nodeType === Node.ELEMENT_NODE) {
            node.querySelectorAll(SELECTORS.image).forEach(applySpoilerStyles);
        }
    }

    function applySpoilerStyles(image) {
        const spoilerSpan = image.closest(SELECTORS.background).querySelector(SELECTORS.spoiler);
        if (spoilerSpan) {
            image.classList.add(spoilerClass);
        }
    }
})();