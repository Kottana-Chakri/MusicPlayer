const playlist = [
    {
      title: "Song 1",
      artist: "Artist 1",
      cover: "album1.jpg",
      audio: "song1.mp3"
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      cover: "album2.jpg",
      audio: "song2.mp3"
    },
    {
      title: "Song 3",
      artist: "Artist 1",
      cover: "album3.jpg",
      audio: "song3.mp3"
    },
    {
      title: "Song 4",
      artist: "Artist 2",
      cover: "album3.jpg",
      audio: "song4.mp3"
    },
    {
      title: "Song 5",
      artist: "Artist 1",
      cover: "album5.jpg",
      audio: "song5.mp3"
    },
    // Add more songs as needed
  ];
  
  let currentTrack = 0;
  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;
  let audio = new Audio(playlist[currentTrack].audio);
  const playBtn = document.getElementById('play');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const shuffleBtn = document.getElementById('shuffle');
  const repeatBtn = document.getElementById('repeat');
  const progressBar = document.getElementById('progress-bar');
  const volumeControl = document.getElementById('volume');
  
  function loadTrack(trackIndex) {
    const track = playlist[trackIndex];
    audio.src = track.audio;
    document.getElementById('track-title').innerText = track.title;
    document.getElementById('artist').innerText = track.artist;
    document.querySelector('.album-cover').src = track.cover;
  }
  
  function playTrack() {
    isPlaying = true;
    audio.play();
    playBtn.innerText = "Pause";
  }
  
  function pauseTrack() {
    isPlaying = false;
    audio.pause();
    playBtn.innerText = "Play";
  }
  
  function togglePlay() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }
  
  function nextTrack() {
    if (isShuffle) {
      currentTrack = Math.floor(Math.random() * playlist.length);
    } else {
      currentTrack = (currentTrack + 1) % playlist.length;
    }
    loadTrack(currentTrack);
    playTrack();
  }
  
  function prevTrack() {
    if (isShuffle) {
      currentTrack = Math.floor(Math.random() * playlist.length);
    } else {
      currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    }
    loadTrack(currentTrack);
    playTrack();
  }
  
  function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    if (isShuffle) {
      repeatBtn.classList.remove('active');
      isRepeat = false;
    }
  }
  
  function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    if (isRepeat) {
      shuffleBtn.classList.remove('active');
      isShuffle = false;
    }
  }
  
  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function setVolume() {
    audio.volume = volumeControl.value;
  }
  
  audio.addEventListener('timeupdate', updateProgressBar);
  audio.addEventListener('ended', () => {
    if (isRepeat) {
      playTrack();
    } else if (isShuffle) {
      currentTrack = Math.floor(Math.random() * playlist.length);
      loadTrack(currentTrack);
      playTrack();
    } else {
      nextTrack();
    }
  });
  
  playBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', nextTrack);
  prevBtn.addEventListener('click', prevTrack);
  shuffleBtn.addEventListener('click', toggleShuffle);
  repeatBtn.addEventListener('click', toggleRepeat);
  volumeControl.addEventListener('input', setVolume);
  
  // Initialize
  loadTrack(currentTrack);
  