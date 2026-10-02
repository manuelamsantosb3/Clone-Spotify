document.addEventListener("DOMContentLoaded", () => {

  const listaMusicasPadrao = [
    {
      id: 1,
      titulo: "Caught You Boy",
      artista: "Lana Del Rey",
      audioUrl: "https://archive.org/download/y-2mate.com-i-want-you-boy-lana-del-rey-espanol/y2mate.com%20-%20I%20want%20you%20boy%20%20Lana%20del%20Rey%20espa%C3%B1ol.mp3",
      capaUrl: "https://i1.sndcdn.com/artworks-1fmYjDiPe3cExDBb-UXmEgA-t500x500.jpg",
      curtida: false
    },
    {
      id: 2,
      titulo: "Without You",
      artista: "Lana Del Rey",
      audioUrl: "https://archive.org/download/y-2mate.com-lana-del-rey-without-you-demo/y2mate.com%20-%20Lana%20Del%20Rey%20%20Without%20You%20Demo.mp3",
      capaUrl: "https://archive.org/download/LanaDelReyParadise/Paradise.png",
      curtida: false
    },
    {
      id: 3,
      titulo: "Exagerado",
      artista: "Cazuza",
      audioUrl: "https://archive.org/download/02-medieval-ii/01%20Exagerado.mp3",
      capaUrl: "https://archive.org/download/02-medieval-ii/Cazuza%20-%20Exagerado%20(1985)%20Capa.jpeg",
      curtida: false
    },
    {
      id: 4,
      titulo: "Boa Vida",
      artista: "Cazuza",
      audioUrl: "https://archive.org/download/02-medieval-ii/08%20Boa%20Vida.mp3",
      capaUrl: "https://archive.org/download/02-medieval-ii/Cazuza%20-%20Exagerado%20(1985)%20Capa.jpeg",
      curtida: false
    },
    {
      id: 5,
      titulo: "Faz Parte do meu Show",
      artista: "Cazuza",
      audioUrl: "https://archive.org/download/09-blues-da-piedade/12%20Faz%20Parte%20Do%20Meu%20Show%20.mp3",
      capaUrl: "https://archive.org/download/09-blues-da-piedade/Cazuza%20-%20Ideologia%20(1988)%20Capa.jpg",
      curtida: false
    },
    {
      id: 6,
      titulo: "Ideologia",
      artista: "Cazuza",
      audioUrl: "https://archive.org/download/09-blues-da-piedade/01%20Ideologia.mp3",
      capaUrl: "https://archive.org/download/09-blues-da-piedade/Cazuza%20-%20Ideologia%20(1988)%20Capa.jpg",
      curtida: false
    },
    {
      id: 7,
      titulo: "Erva Venenosa",
      artista: "Rita Lee",
      audioUrl: "https://archive.org/download/16-mon-amour/02%20-%20Erva%20Venenosa%20%28Poison%20Ivy%29.mp3",
      capaUrl: "https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0",
      curtida: false
    },
    {
      id: 8,
      titulo: "Flagra",
      artista: "Rita Lee",
      audioUrl: "https://archive.org/download/16-mon-amour/03%20-%20Flagra.mp3",
      capaUrl: "https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0",
      curtida: false
    },
    {
      id: 9,
      titulo: "Chega Mais",
      artista: "Rita Lee",
      audioUrl: "https://archive.org/download/16-mon-amour/04%20-%20Chega%20Mais.mp3",
      capaUrl: "https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0",
      curtida: false
    },
    {
      id: 10,
      titulo: "Agora Só Falta Você",
      artista: "Rita Lee",
      audioUrl: "https://archive.org/download/16-mon-amour/05%20-%20Agora%20S%C3%B3%20Falta%20Voc%C3%AA.mp3",
      capaUrl: "https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0",
      curtida: false
    },
     {
      id: 11,
      titulo: "Velha Infância",
      artista: "Tribalistas",
      audioUrl: "https://archive.org/download/01.-carnavalia-2004-digital-remaster/Tribalistas/03.%20Velha%20Inf%C3%A2ncia%20-%202004%20Digital%20Remaster.mp3",
      capaUrl: "https://dn601300.us.archive.org/0/items/01.-carnavalia-2004-digital-remaster/Tribalistas/Tribalistas_capa.jpg?cnt=0",
      curtida: false
    },
     {
      id: 12,
      titulo: "É Você",
      artista: "Tribalistas",
      audioUrl: "https://archive.org/download/01.-carnavalia-2004-digital-remaster/Tribalistas/06.%20%C3%89%20Voc%C3%AA%20-%202004%20Digital%20Remaster.mp3",
      capaUrl: "https://dn601300.us.archive.org/0/items/01.-carnavalia-2004-digital-remaster/Tribalistas/Tribalistas_capa.jpg?cnt=0",
      curtida: false
    },
     {
      id: 13,
      titulo: "Já sei namorar",
      artista: "Tribalistas",
      audioUrl: "https://archive.org/download/16-mon-amour/05%20-%20Agora%20S%C3%B3%20Falta%20Voc%C3%AA.mp3",
      capaUrl: "https://dn601300.us.archive.org/0/items/01.-carnavalia-2004-digital-remaster/Tribalistas/Tribalistas_capa.jpg?cnt=0",
      curtida: false
    },
     {
      id: 14,
      titulo: "Malandagem",
      artista: "Cássia Eller",
      audioUrl: "https://archive.org/download/05-1o-de-julho/02%20-%20Malandragem.mp3",
      capaUrl: "https://archive.org/download/05-1o-de-julho/C%C3%A1ssia%20Eller%20(1994)%20Capa.jpg?scale=1&rotate=0&scale=1&rotate=0",
      curtida: false
    }
  ];


  const musicasCadastradas = JSON.parse(localStorage.getItem("flow_tracks")) || [];
  const novasMusicas = musicasCadastradas.map(m => ({
    id: m.id || Date.now(),
    titulo: m.titulo || m.title,
    artista: m.artista || m.artist,
    audioUrl: m.audioUrl || m.audio || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    capaUrl: m.capaUrl || m.cover,
    curtida: false
  }));

  const listaMusicas = [...listaMusicasPadrao, ...novasMusicas];
  let listaFiltrada = [...listaMusicas];


  const trackGrid = document.getElementById("track-list");
  const likedTrackGrid = document.getElementById("liked-tracks-list");
  const audioPlayer = document.getElementById("audio-player");
  const btnPlay = document.getElementById("btn-play");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnLikeCurrent = document.getElementById("btn-like-current");
  
  const trackCover = document.getElementById("track-cover");
  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  
  const progressBar = document.getElementById("progress-bar");
  const volumeBar = document.getElementById("volume-bar");
  const timeCurrent = document.getElementById("time-current");
  const timeTotal = document.getElementById("time-total");
  const searchInput = document.getElementById("search-input");
  const songForm = document.getElementById("song-form");

  let indiceAtual = 0;
  let estaTocando = false;


  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll(".content-section");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");

      if (targetId) {
        navLinks.forEach(l => l.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));

        link.classList.add("active");
        const activeSection = document.getElementById(targetId);
        if (activeSection) activeSection.classList.add("active");
      }
    });
  });

  function renderizarGrelha(lista = listaFiltrada) {
    if (!trackGrid) return;
    trackGrid.innerHTML = "";

    if (lista.length === 0) {
      trackGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">Nenhuma música encontrada.</p>`;
      return;
    }

    lista.forEach((musica) => {
      const card = document.createElement("article");
      card.classList.add("track-card");

      card.innerHTML = `
        <button type="button" class="card-like-btn ${musica.curtida ? 'liked' : ''}" aria-label="Curtir">
          <i class="fa-${musica.curtida ? 'solid' : 'regular'} fa-heart"></i>
        </button>
        <div class="cover-wrapper">
          <img src="${musica.capaUrl}" alt="${musica.titulo}">
          <button type="button" class="card-play-btn" aria-label="Tocar"><i class="fa-solid fa-play"></i></button>
        </div>
        <div class="track-card-info">
          <h4>${musica.titulo}</h4>
          <p>${musica.artista}</p>
        </div>
      `;

      const likeBtn = card.querySelector(".card-like-btn");
      likeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCurtida(musica.id);
      });

      card.addEventListener("click", () => {
        const indexNaListaPrincipal = listaMusicas.findIndex(m => Number(m.id) === Number(musica.id));
        if (indexNaListaPrincipal !== -1) {
          carregarMusica(indexNaListaPrincipal);
          tocarMusica();
        }
      });

      trackGrid.appendChild(card);
    });

    renderizarCurtidas();
  }

  function renderizarCurtidas() {
    if (!likedTrackGrid) return;
    const curtidas = listaMusicas.filter(m => m.curtida);

    if (curtidas.length === 0) {
      likedTrackGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">Nenhuma música curtida ainda.</p>`;
      return;
    }

    likedTrackGrid.innerHTML = "";
    curtidas.forEach((musica) => {
      const card = document.createElement("article");
      card.classList.add("track-card");

      card.innerHTML = `
        <div class="cover-wrapper">
          <img src="${musica.capaUrl}" alt="${musica.titulo}">
          <button type="button" class="card-play-btn" aria-label="Tocar"><i class="fa-solid fa-play"></i></button>
        </div>
        <div class="track-card-info">
          <h4>${musica.titulo}</h4>
          <p>${musica.artista}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        const indexNaListaPrincipal = listaMusicas.findIndex(m => Number(m.id) === Number(musica.id));
        if (indexNaListaPrincipal !== -1) {
          carregarMusica(indexNaListaPrincipal);
          tocarMusica();
        }
      });

      likedTrackGrid.appendChild(card);
    });
  }

  function toggleCurtida(id) {
    const musica = listaMusicas.find(m => Number(m.id) === Number(id));
    if (musica) {
      musica.curtida = !musica.curtida;
      renderizarGrelha(listaFiltrada);
      atualizarBotaoLikePlayer();
    }
  }

  function atualizarBotaoLikePlayer() {
    const musicaAtual = listaMusicas[indiceAtual];
    if (!btnLikeCurrent || !musicaAtual) return;

    if (musicaAtual.curtida) {
      btnLikeCurrent.classList.add("liked");
      btnLikeCurrent.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    } else {
      btnLikeCurrent.classList.remove("liked");
      btnLikeCurrent.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }
  }

  if (btnLikeCurrent) {
    btnLikeCurrent.addEventListener("click", () => {
      const musicaAtual = listaMusicas[indiceAtual];
      if (musicaAtual) {
        toggleCurtida(musicaAtual.id);
      }
    });
  }


  function carregarMusica(index) {
    if (index < 0 || index >= listaMusicas.length) return;
    indiceAtual = index;
    const musica = listaMusicas[indiceAtual];

    audioPlayer.src = musica.audioUrl;
    trackCover.src = musica.capaUrl;
    trackTitle.textContent = musica.titulo;
    trackArtist.textContent = musica.artista;

    atualizarBotaoLikePlayer();
  }

  function tocarMusica() {
    audioPlayer.play();
    estaTocando = true;
    btnPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }

  function pausarMusica() {
    audioPlayer.pause();
    estaTocando = false;
    btnPlay.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }

  btnPlay.addEventListener("click", () => {
    if (estaTocando) {
      pausarMusica();
    } else {
      tocarMusica();
    }
  });

  btnNext.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % listaMusicas.length;
    carregarMusica(indiceAtual);
    tocarMusica();
  });

  btnPrev.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + listaMusicas.length) % listaMusicas.length;
    carregarMusica(indiceAtual);
    tocarMusica();
  });


  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase().trim();
      listaFiltrada = listaMusicas.filter(musica => 
        musica.titulo.toLowerCase().includes(termo) ||
        musica.artista.toLowerCase().includes(termo)
      );
      renderizarGrelha(listaFiltrada);
    });
  }


  audioPlayer.addEventListener("timeupdate", () => {
    if (audioPlayer.duration) {
      const porcentagem = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = porcentagem;
      timeCurrent.textContent = formatarTempo(audioPlayer.currentTime);
      timeTotal.textContent = formatarTempo(audioPlayer.duration);
    }
  });

  progressBar.addEventListener("input", () => {
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
  });

  volumeBar.addEventListener("input", () => {
    audioPlayer.volume = volumeBar.value;
  });

  audioPlayer.addEventListener("ended", () => {
    indiceAtual = (indiceAtual + 1) % listaMusicas.length;
    carregarMusica(indiceAtual);
    tocarMusica();
  });

  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? "0" : ""}${seg}`;
  }


  if (songForm) {
    songForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const audioInput = document.getElementById("song-audio").value;

      const novaMusica = {
        id: Date.now(),
        titulo: document.getElementById("song-title").value,
        artista: document.getElementById("song-artist").value,
        capaUrl: document.getElementById("song-cover").value,
        audioUrl: audioInput ? audioInput : "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
        curtida: false
      };


      const salvas = JSON.parse(localStorage.getItem("flow_tracks")) || [];
      salvas.push(novaMusica);
      localStorage.setItem("flow_tracks", JSON.stringify(salvas));


      listaMusicas.push(novaMusica);
      listaFiltrada = [...listaMusicas];
      renderizarGrelha();

      alert(`Música "${novaMusica.titulo}" cadastrada com sucesso!`);
      songForm.reset();


      const homeLink = document.querySelector('[data-target="section-home"]');
      if (homeLink) homeLink.click();
    });
  }


  renderizarGrelha();
  carregarMusica(0);
});
