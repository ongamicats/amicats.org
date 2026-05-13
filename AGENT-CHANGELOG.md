Changelog for small landing fixes

- language-select: render dropdown in a portal to body so it appears above
  ImageStack (avoids stacking-context conflicts). Position computed from
  trigger and uses fixed positioning. Also use capture-phase document
  listener to close reliably.
- language-select: pass resetScroll: false to navigate(...) when switching
  locale so current scroll position is preserved.
- image-stack: avoid adding extra stacking context on parent wrapper.
