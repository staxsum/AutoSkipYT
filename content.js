console.log('AutoSkipYT: Content script loaded — time to give those ads the boot!');

let cachedSkipButton = null;

// Search for that sneaky skip button hiding in the DOM jungle
function findSkipButton() {
  const selectors = [
    '.ytp-ad-skip-button',              // Classic "Get me out of here!" button
    '.ytp-ad-skip-button-modern',      // The fancy new skip button trying to be sneaky
    '.videoAdUiSkipButton',             // Backup plan in case the others are hiding
    'button[class*="skip"]',            // Catch-all for anything with "skip" in its name — because screw ads
  ];
  for (const sel of selectors) {
    const btn = document.querySelector(sel);
    if (btn) return btn;
  }
  // If we can't find the skip button, maybe it's watching us instead
  return null;
}

// Attempt to click the skip button like a ninja avoiding ads
function tryClickSkip() {
  if (!cachedSkipButton || !document.contains(cachedSkipButton)) {
    cachedSkipButton = findSkipButton();
  }

  if (cachedSkipButton && typeof cachedSkipButton.click === 'function') {
    // Simulate the most convincing user click ever to fool YouTube's ad overlords
    cachedSkipButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    cachedSkipButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    cachedSkipButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    cachedSkipButton.click();
    console.log('⏭AutoSkipYT: Clicked skip ad button with simulated user events. Take that, ads!');
  } else {
    // No skip button found — guess we'll suffer through the ad (for now)
    // console.log('AutoSkipYT: Skip button not found. Ads, you win this round...');
  }
}

// Mute those obnoxious ads because our ears deserve peace
function handleAdMute() {
  const video = document.querySelector('video');
  const adShowing = document.querySelector('.ad-showing');

  if (video && adShowing) {
    if (!video.muted) {
      video.muted = true;
      console.log('AutoSkipYT: Muted ad. Silence is golden.');
    }
  } else if (video && video.muted) {
    video.muted = false;
    console.log('AutoSkipYT: Unmuted after ad. Welcome back, sweet silence.');
    cachedSkipButton = null; // Reset cache — new ads, new problems
  }
}

const observer = new MutationObserver(() => {
  handleAdMute();
  tryClickSkip();
});

function waitForPlayer() {
  const player = document.querySelector('.html5-video-player');
  if (player) {
    observer.observe(player, { childList: true, subtree: true });
    console.log('AutoSkipYT: Watching player for ad changes. Ready to pounce!');
  } else {
    console.log('AutoSkipYT: Player not found, retrying... Patience is a virtue.');
    setTimeout(waitForPlayer, 1000);
  }
}

waitForPlayer();

// Fallback interval to keep fighting the good fight every 3 seconds
setInterval(() => {
  tryClickSkip();
  handleAdMute();
}, 3000);
