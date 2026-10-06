export function createPlayer({ tracks, fallbackCover, getTrackData }) {
  const audio = document.getElementById("audio-player");
  const cover = document.getElementById("track-cover");
  const title = document.getElementById("track-title");
  const artist = document.getElementById("track-artist");
  const status = document.getElementById("playback-status");
  const progress = document.getElementById("progress-bar");
  const currentTime = document.getElementById("time-current");
  const totalTime = document.getElementById("time-total");
  const playButton = document.getElementById("btn-play");
  const volume = document.getElementById("volume-bar");
  let currentIndex = 0;
  let currentTrackKey = null;
  let currentAudioUrl = "";

  const formatTime = seconds => Number.isFinite(seconds)
    ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`
    : "0:00";

  function loadTrack(track) {
    currentIndex = tracks.indexOf(track);
    currentTrackKey = track.dbKey || null;
    currentAudioUrl = String(track.audioUrl || "").trim();
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    cover.onerror = () => {
      cover.onerror = null;
      cover.src = fallbackCover;
    };
    cover.src = track.capaUrl || fallbackCover;
    title.textContent = track.titulo;
    artist.textContent = track.artista;
    progress.value = 0;
    currentTime.textContent = "0:00";
    totalTime.textContent = "0:00";
    status.textContent = "";

    if (!currentAudioUrl) {
      status.textContent = "Esta música não tem um arquivo de áudio válido cadastrado.";
      const rawTrack = getTrackData()?.[track.dbKey || track.id];
      console.error("Música sem áudio no Realtime Database", {
        id: track.id,
        title: track.titulo,
        fields: rawTrack ? Object.keys(rawTrack) : []
      });
      return;
    }

    audio.src = currentAudioUrl;
    audio.load();
    let source = currentAudioUrl.startsWith("data:") ? "data URL" : currentAudioUrl;
    if (!currentAudioUrl.startsWith("data:")) {
      try { source = new URL(currentAudioUrl, location.href).href; }
      catch { source = "Invalid URL"; }
    }
    console.info("Faixa carregada", {
      id: track.id,
      title: track.titulo,
      source
    });
  }

  function playTrack(track) {
    loadTrack(track);
    audio.play().catch(error => {
      console.error("Falha ao reproduzir áudio", error);
      status.textContent = "Não foi possível reproduzir este áudio. Verifique o arquivo ou a conexão.";
    });
  }

  function step(direction) {
    if (!tracks.length) return;
    currentIndex = (currentIndex + direction + tracks.length) % tracks.length;
    playTrack(tracks[currentIndex]);
  }

  function clearDeletedTrack() {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    currentTrackKey = null;
    currentAudioUrl = "";
    currentIndex = 0;
    cover.onerror = null;
    cover.src = fallbackCover;
    title.textContent = "Selecione uma música";
    artist.textContent = "Flow Beats";
    progress.value = 0;
    currentTime.textContent = "0:00";
    totalTime.textContent = "0:00";
    status.textContent = "";
  }

  function syncTrack(track) {
    currentIndex = tracks.indexOf(track);
    title.textContent = track.titulo;
    artist.textContent = track.artista;
    cover.src = track.capaUrl || fallbackCover;
    if (track.audioUrl === currentAudioUrl) return;
    const wasPlaying = !audio.paused;
    loadTrack(track);
    if (wasPlaying) audio.play().catch(error => console.error("Falha ao reproduzir faixa atualizada", error));
  }

  function updateProgress() {
    const duration = audio.duration;
    totalTime.textContent = formatTime(duration);
    currentTime.textContent = formatTime(audio.currentTime);
    progress.value = Number.isFinite(duration) && duration > 0 ? audio.currentTime / duration * 100 : 0;
  }

  document.getElementById("btn-next").onclick = () => step(1);
  document.getElementById("btn-prev").onclick = () => step(-1);
  playButton.onclick = () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.error("Falha ao reproduzir áudio", { name: error.name, message: error.message, source: audio.currentSrc });
        status.textContent = "Não foi possível reproduzir este áudio. Verifique o arquivo ou a conexão.";
      });
    } else {
      audio.pause();
    }
  };
  audio.onplay = () => {
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playButton.title = "Pausar";
    playButton.setAttribute("aria-label", "Pausar");
  };
  audio.onpause = () => {
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    playButton.title = "Reproduzir";
    playButton.setAttribute("aria-label", "Reproduzir");
  };
  audio.onended = () => step(1);
  audio.addEventListener("error", () => {
    if (!audio.currentSrc) return;
    const error = audio.error;
    console.error("Erro ao carregar áudio", {
      track: title.textContent,
      code: error?.code,
      message: error?.message || "sem detalhe do navegador",
      networkState: audio.networkState,
      readyState: audio.readyState,
      source: audio.currentSrc.startsWith("data:") ? "data URL (conteúdo omitido)" : audio.currentSrc
    });
    status.textContent = error?.code === 4
      ? "Formato ou endereço de áudio incompatível/indisponível."
      : "Não foi possível carregar este áudio. Verifique a conexão ou o endereço cadastrado.";
  });
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", updateProgress);
  progress.oninput = () => {
    if (Number.isFinite(audio.duration)) audio.currentTime = Number(progress.value) / 100 * audio.duration;
  };
  audio.volume = Number(volume.value);
  volume.oninput = event => { audio.volume = Number(event.target.value); };

  return {
    loadTrack,
    playTrack,
    syncTrack,
    clearDeletedTrack,
    getCurrentTrackKey: () => currentTrackKey
  };
}
