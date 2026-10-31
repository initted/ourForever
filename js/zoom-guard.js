'use strict';

// Register before the invitation loads so zoom protection is always active.
(() => {
  const options = { passive: false, capture: true };
  const preventZoom = event => {
    if (event.cancelable) event.preventDefault();
  };

  // Desktop Chrome delivers trackpad pinch gestures as Ctrl+wheel.
  window.addEventListener('wheel', event => {
    if (event.ctrlKey) preventZoom(event);
  }, options);

  // Touchscreen pinch gestures and engines that expose native gesture events.
  ['touchstart', 'touchmove'].forEach(type => {
    window.addEventListener(type, event => {
      if (event.touches.length > 1) preventZoom(event);
    }, options);
  });
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(type => {
    window.addEventListener(type, preventZoom, options);
  });

  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) &&
        (['+', '-', '=', '0'].includes(event.key) ||
         ['NumpadAdd', 'NumpadSubtract', 'Numpad0'].includes(event.code))) {
      preventZoom(event);
    }
  }, options);
})();
