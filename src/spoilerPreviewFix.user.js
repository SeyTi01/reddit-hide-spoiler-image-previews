// ==UserScript==
// @name         Reddit: Hide Spoiler Image Previews
// @namespace    https://github.com/SeyTi01/
// @version      1.5
// @description  Applies blur effect to visible spoiler image previews on new Reddit.
// @author       SeyTi01
// @match        https://www.reddit.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const SELECTORS = {
        imageDiv: 'div._2c1ElNxHftd8W_nZtcG9zf',
        spoilerSpan: 'span._1wzhGvvafQFOWAyA157okr, span._1P0ASR__enq34IxkSim2Rk',
        backgroundClosest: '._1poyrkZ7g36PawDueRza-J'
    };

    const spoilerClass = 'GnWcY6GPzeZ5rzsiQ98fo';
    const observer = new MutationObserver(observeMutations);

    document.querySelectorAll(SELECTORS.imageDiv).forEach(applySpoilerStyles);
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
            node.querySelectorAll(SELECTORS.imageDiv).forEach(applySpoilerStyles);
        }
    }

    function applySpoilerStyles(image) {
        const background = image.closest(SELECTORS.backgroundClosest);
        const spoilerSpan = background.querySelector(SELECTORS.spoilerSpan);
        if (spoilerSpan) {
            image.classList.add(spoilerClass);
        }
    }
})();