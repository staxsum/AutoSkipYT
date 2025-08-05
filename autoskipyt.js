// ==UserScript==
// @name         AutoSkipYT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skips YouTube ads automatically
// @author       j4g
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CHECK_INTERVAL = 500; // Check every 500ms
    const SEEK_DURATION = 15;   // Seek 15s ahead for unskippable ads

    // Main function to skip ads
    function skipAd() {
        // Try to find and click skip buttons
        const skipButtons = [
            '.ytp-ad-skip-button-modern',
            '.ytp-skip-ad-button',
            'button[aria-label^="Skip ad"]'
        ];

        for (const selector of skipButtons) {
            const button = document.querySelector(selector);
            if (button && button.offsetParent !== null) {
                button.click();
                return true;
            }
        }

        // If no skip button, seek through unskippable ads
        const video = document.querySelector('video');
        if (video && document.querySelector('.ad-showing, .ad-interrupting')) {
            video.currentTime = video.duration - 0.1;
            return true;
        }

        return false;
    }

    // Run the skip function regularly
    setInterval(skipAd, CHECK_INTERVAL);

    // Also run when page changes (for SPA navigation)
    document.addEventListener('yt-navigate-finish', skipAd);
})();
