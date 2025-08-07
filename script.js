// Sample playlist data
const playlist = [
  {
    title: "Never Less",
    artist: "Samia",
    cover: "./images/Never_less.png",
    src: "./music/samia_jawadi-never_less.mp3",
  },
  {
    title: "Galexy",
    artist: "Samia",
    cover: "./images/galexy.png",
    src: "./music/samia_jawadi-galaxy.mp3",
  },
  {
    title: "Lil Nhar",
    artist: "Samia & Wizo",
    cover: "./images/Lil&Nhar.png",
    src: "./music/Wizou Feat Semia L_artiste - Lil_Nhar (Official audio)(MP3_160K).mp3",
  },
  {
    title: "So far for me ",
    artist: "Samia",
    cover: "./images/So_far_for_me.png",
    src: "./music/samia_jawadi-so_far_for_me.mp3",
  },
  {
    title: "Chamsi",
    artist: "Samia",
    cover: "./images/Chamsi.png",
    src: "./music/samia_jawadi-chamsi.mp3",
  },
  {
    title: "Ghir inty",
    artist: "Samia",
    cover: "./images/ghir_inty.jpg",
    src: "./music/samia_jawadi-4ir_inty.mp3",
  },
  {
    title: "Lil",
    artist: "Samia",
    cover: "./images/lil.png",
    src: "./music/samia_jawadi-lil_2.mp3",
  },
  {
    title: "My Place",
    artist: "Samia",
    cover: "./images/my_place.png",
    src: "./music/samia_jawadi-my_place.mp3",
  },
  {
    title: "Nafs il Ghaltat",
    artist: "Samia",
    cover: "./images/Nafs_ilghaltat.png",
    src: "./music/samia_jawadi-nafs_il_ghaltat.mp3",
  },
  {
    title: "Raja3li ilklmet",
    artist: "Samia",
    cover: "./images/Raga3li_il_kelmet.png",
    src: "./music/samia_jawadi-raja3li_ilklmet.mp3",
  },
  {
    title: "Regrets",
    artist: "Samia",
    cover: "./images/regrets.png",
    src: "./music/samia_jawadi-regrets.mp3",
  },

  {
    title: "Stay away",
    artist: "Samia",
    cover: "./images/stay_away.png",
    src: "./music/samia_jawadi-stay_away.mp3",
  },
];

// DOM elements
const playerContainer = document.getElementById("player");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const repeatBtn = document.getElementById("repeat-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const volumeControl = document.getElementById("volume-control");
const cdImage = document.getElementById("cd-image");
const playlistEl = document.getElementById("playlist");

let currentTrackIndex = 0;
let isPlaying = false;
let repeatMode = "none"; // 'none', 'one', 'all'
let isShuffle = false;
let originalPlaylist = [...playlist];

// Initialize player
function loadTrack(index) {
  const track = playlist[index];

  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  cdImage.style.backgroundImage = `url('${track.cover}')`;
  audio.src = track.src;

  // Update active item in playlist
  const playlistItems = document.querySelectorAll(".playlist-item");
  playlistItems.forEach((item) => item.classList.remove("active"));
  if (playlistItems[index]) {
    playlistItems[index].classList.add("active");
  }

  // Reset progress bar
  progressBar.style.width = "0%";
  currentTimeEl.textContent = "0:00";

  // Load and display duration when metadata is loaded
  audio.addEventListener(
    "loadedmetadata",
    () => {
      durationEl.textContent = formatTime(audio.duration);
    },
    { once: true }
  );
}

// Play or pause track
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playerContainer.classList.remove("playing");
  } else {
    audio.play().catch((e) => console.log("Play prevented:", e));
    playerContainer.classList.add("playing");
  }
  isPlaying = !isPlaying;
  updatePlayIcon();
}

// Update play/pause icon
function updatePlayIcon() {
  if (isPlaying) {
    playIcon.innerHTML =
      '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  } else {
    playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  }
}

// Go to previous track
function prevTrack() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playlist.length - 1;
  }
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    audio.play().catch((e) => console.log("Play prevented:", e));
  }
}

// Go to next track
function nextTrack() {
  // Check repeat mode
  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Play prevented:", e));
    return;
  }

  currentTrackIndex++;
  if (currentTrackIndex > playlist.length - 1) {
    if (repeatMode === "all") {
      currentTrackIndex = 0;
    } else {
      currentTrackIndex = playlist.length - 1;
      isPlaying = false;
      updatePlayIcon();
      playerContainer.classList.remove("playing");
      return;
    }
  }

  loadTrack(currentTrackIndex);
  if (isPlaying) {
    audio.play().catch((e) => console.log("Play prevented:", e));
  }
}

// Toggle repeat mode
function toggleRepeat() {
  const modes = ["none", "one", "all"];
  const currentIndex = modes.indexOf(repeatMode);
  repeatMode = modes[(currentIndex + 1) % modes.length];

  // Update UI
  repeatBtn.classList.toggle("active", repeatMode !== "none");

  // Change icon based on mode
  if (repeatMode === "one") {
    repeatBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 1l4 4-4 4"></path>
                        <path d="M3 11V9a4 4 0 014-4h14"></path>
                        <path d="M7 23l-4-4 4-4"></path>
                        <path d="M21 13v2a4 4 0 01-4 4H3"></path>
                        <path d="M11 15h2v2h-2z"></path>
                    </svg>
                `;
  } else if (repeatMode === "all") {
    repeatBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 1l4 4-4 4"></path>
                        <path d="M3 11V9a4 4 0 014-4h14"></path>
                        <path d="M7 23l-4-4 4-4"></path>
                        <path d="M21 13v2a4 4 0 01-4 4H3"></path>
                    </svg>
                `;
  } else {
    repeatBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 1l4 4-4 4"></path>
                        <path d="M3 11V9a4 4 0 014-4h14"></path>
                        <path d="M7 23l-4-4 4-4"></path>
                        <path d="M21 13v2a4 4 0 01-4 4H3"></path>
                    </svg>
                `;
  }
}

// Toggle shuffle mode
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);

  if (isShuffle) {
    // Save original playlist order
    originalPlaylist = [...playlist];

    // Shuffle the playlist (Fisher-Yates algorithm)
    for (let i = playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }

    // Find the current track in the shuffled playlist
    const currentTrack = originalPlaylist[currentTrackIndex];
    currentTrackIndex = playlist.findIndex(
      (track) =>
        track.title === currentTrack.title &&
        track.artist === currentTrack.artist
    );
  } else {
    // Restore original playlist order
    playlist.length = 0;
    playlist.push(...originalPlaylist);

    // Find the current track in the original playlist
    const currentTrack = playlist[currentTrackIndex];
    currentTrackIndex = originalPlaylist.findIndex(
      (track) =>
        track.title === currentTrack.title &&
        track.artist === currentTrack.artist
    );
  }

  // Recreate the playlist UI
  createPlaylist();
  loadTrack(currentTrackIndex);
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(currentTime);
}

// Set progress when clicked on progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Format time from seconds to MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update volume
function setVolume() {
  audio.volume = this.value / 100;
}

// Create playlist UI
function createPlaylist() {
  playlistEl.innerHTML = "";

  playlist.forEach((track, index) => {
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("playlist-item");
    if (index === currentTrackIndex) playlistItem.classList.add("active");

    playlistItem.innerHTML = `
                    <img src="${track.cover}" alt="${track.title} thumbnail" />
                    <div class="playlist-info">
                        <div class="playlist-item-title">${track.title}</div>
                        <div class="playlist-item-artist">${track.artist}</div>
                    </div>
                `;

    playlistItem.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      if (!isPlaying) {
        togglePlay();
      } else {
        audio.play().catch((e) => console.log("Play prevented:", e));
      }
    });

    playlistEl.appendChild(playlistItem);
  });
}

// Event listeners
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
repeatBtn.addEventListener("click", toggleRepeat);
shuffleBtn.addEventListener("click", toggleShuffle);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextTrack);
progressContainer.addEventListener("click", setProgress);
volumeControl.addEventListener("input", setVolume);

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");

function setTheme(isDark) {
  document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update toggle icon
  themeToggle.innerHTML = isDark
    ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>`
    : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>`;
}

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") !== "dark";
  setTheme(isDark);
});

// Welcome screen functionality
const welcomeScreen = document.getElementById("welcome-screen");
const enterBtn = document.getElementById("enter-btn");
const player = document.getElementById("player");

enterBtn.addEventListener("click", () => {
  welcomeScreen.style.opacity = "0";
  setTimeout(() => {
    welcomeScreen.style.display = "none";
    player.style.display = "block";

    // Initialize player without autoplay
    createPlaylist();
    loadTrack(0);
  }, 500);
});
