Drop real Editkaro.in clips here (mp4, web-optimized, ideally under ~8MB each
for fast hover-preview loading).

Naming convention used by script.js — match a clip's "video" field to a file
here, e.g.:

  videos/shortform-reel-drop.mp4
  videos/football-matchday-highlight.mp4

Then in script.js, add a `video: 'videos/your-file.mp4'` property to that
clip's object in the CLIPS array. The card will automatically play a muted
preview loop on hover once a video path is present — clips without a `video`
field just show their poster image from /images.
