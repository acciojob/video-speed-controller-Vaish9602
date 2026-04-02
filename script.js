const player = document.querySelector(".player");
const video = document.querySelector(".player__video");
const toggle = document.querySelector(".toggle");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const ranges = document.querySelectorAll('input[type="range"]');
const rewind = document.querySelector(".rewind");
const forward = document.querySelector(".forward");

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update button icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Volume & Speed control
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip (rewind/forward)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Progress bar update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Click to seek
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// EVENTS
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);

ranges.forEach(range =>
  range.addEventListener("input", handleRangeUpdate)
);

rewind.addEventListener("click", skip);
forward.addEventListener("click", skip);

video.addEventListener("timeupdate", handleProgress);

progress.addEventListener("click", scrub);