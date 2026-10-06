import { auth } from "./firebase-config.js";
import { createAccount, logIn, logOut, observeAuth } from "./auth.js";
import { setMusicLike, watchLikes } from "./likes.js";
import { atualizarMusica, buscarMusicas, criarMusica, excluirMusica, isMusicOwner } from "./crud.js";
import { createPlayer } from "./player.js";
import { renderTrackCards } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const tracks = [];
  const defaultTracks = [
    {id:1,titulo:"Caught You Boy",artista:"Lana Del Rey",audioUrl:"https://archive.org/download/y-2mate.com-i-want-you-boy-lana-del-rey-espanol/y2mate.com%20-%20I%20want%20you%20boy%20%20Lana%20del%20Rey%20espa%C3%B1ol.mp3",capaUrl:"https://i1.sndcdn.com/artworks-1fmYjDiPe3cExDBb-UXmEgA-t500x500.jpg"},
    {id:2,titulo:"Without You",artista:"Lana Del Rey",audioUrl:"https://archive.org/download/y-2mate.com-lana-del-rey-without-you-demo/y2mate.com%20-%20Lana%20Del%20Rey%20%20Without%20You%20Demo.mp3",capaUrl:"https://archive.org/download/LanaDelReyParadise/Paradise.png"},
    {id:3,titulo:"Exagerado",artista:"Cazuza",audioUrl:"https://archive.org/download/02-medieval-ii/01%20Exagerado.mp3",capaUrl:"https://archive.org/download/02-medieval-ii/Cazuza%20-%20Exagerado%20(1985)%20Capa.jpeg"},
    {id:4,titulo:"Boa Vida",artista:"Cazuza",audioUrl:"https://archive.org/download/02-medieval-ii/08%20Boa%20Vida.mp3",capaUrl:"https://archive.org/download/02-medieval-ii/Cazuza%20-%20Exagerado%20(1985)%20Capa.jpeg"},
    {id:5,titulo:"Faz Parte do meu Show",artista:"Cazuza",audioUrl:"https://archive.org/download/09-blues-da-piedade/12%20Faz%20Parte%20Do%20Meu%20Show%20.mp3",capaUrl:"https://archive.org/download/09-blues-da-piedade/Cazuza%20-%20Ideologia%20(1988)%20Capa.jpg"},
    {id:6,titulo:"Ideologia",artista:"Cazuza",audioUrl:"https://archive.org/download/09-blues-da-piedade/01%20Ideologia.mp3",capaUrl:"https://archive.org/download/09-blues-da-piedade/Cazuza%20-%20Ideologia%20(1988)%20Capa.jpg"},
    {id:7,titulo:"Erva Venenosa",artista:"Rita Lee",audioUrl:"https://archive.org/download/16-mon-amour/02%20-%20Erva%20Venenosa%20%28Poison%20Ivy%29.mp3",capaUrl:"https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0"},
    {id:8,titulo:"Flagra",artista:"Rita Lee",audioUrl:"https://archive.org/download/16-mon-amour/03%20-%20Flagra.mp3",capaUrl:"https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0"},
    {id:9,titulo:"Chega Mais",artista:"Rita Lee",audioUrl:"https://archive.org/download/16-mon-amour/04%20-%20Chega%20Mais.mp3",capaUrl:"https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0"},
    {id:10,titulo:"Agora Só Falta Você",artista:"Rita Lee",audioUrl:"https://archive.org/download/16-mon-amour/05%20-%20Agora%20S%C3%B3%20Falta%20Voc%C3%AA.mp3",capaUrl:"https://dn601303.us.archive.org/0/items/16-mon-amour/Rita%20Lee%20-%20Novelas%20%282002%29.jpg?cnt=0"},
    {id:11,titulo:"Velha Infância",artista:"Tribalistas",audioUrl:"https://archive.org/download/01.-carnavalia-2004-digital-remaster/Tribalistas/03.%20Velha%20Inf%C3%A2ncia%20-%202004%20Digital%20Remaster.mp3",capaUrl:"https://dn601300.us.archive.org/0/items/01.-carnavalia-2004-digital-remaster/Tribalistas/Tribalistas_capa.jpg?cnt=0"},
    {id:12,titulo:"É Você",artista:"Tribalistas",audioUrl:"https://archive.org/download/01.-carnavalia-2004-digital-remaster/Tribalistas/06.%20%C3%89%20Voc%C3%AA%20-%202004%20Digital%20Remaster.mp3",capaUrl:"https://dn601300.us.archive.org/0/items/01.-carnavalia-2004-digital-remaster/Tribalistas/Tribalistas_capa.jpg?cnt=0"},
    {id:13,titulo:"Já sei namorar",artista:"Tribalistas",audioUrl:"https://archive.org/download/16-mon-amour/05%20-%20Agora%20S%C3%B3%20Falta%20Voc%C3%AA.mp3",capaUrl:"https://dn601300.us.archive.org/0/items/01.-carnavalia-2004-digital-remaster/Tribalistas/Tribalistas_capa.jpg?cnt=0"},
    {id:14,titulo:"Malandagem",artista:"Cássia Eller",audioUrl:"https://archive.org/download/05-1o-de-julho/02%20-%20Malandragem.mp3",capaUrl:"https://archive.org/download/05-1o-de-julho/C%C3%A1ssia%20Eller%20(1994)%20Capa.jpg"}
  ].map(track=>({...track,curtida:false}));
  tracks.push(...defaultTracks);
  const audio=document.getElementById("audio-player"), grid=document.getElementById("track-list"), likedGrid=document.getElementById("liked-tracks-list");
  let user=null,likedIds=new Set(),trackData={},editingTrack=null;
  const fallbackCover="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#101522"/><stop offset="1" stop-color="#241033"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="175" r="72" fill="none" stroke="#00e5ff" stroke-width="9" opacity=".7"/><path d="M225 122v112a37 37 0 1 1-18-32v-80l105-23v104a37 37 0 1 1-18-32v-94z" fill="#00e5ff"/><text x="200" y="340" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="24">Sem capa</text></svg>');
  function watchCover(img){img.onerror=()=>{img.onerror=null;img.src=fallbackCover;img.dataset.fallback="true";};}
  const player=createPlayer({tracks,fallbackCover,getTrackData:()=>trackData});
  const ownsTrack=t=>isMusicOwner(t,user);
  function paint() {
    const cardOptions = {
      likedIds, fallbackCover, isOwner: ownsTrack,
      onLike: toggleLike,
      onPlay: player.playTrack,
      onEdit: openEdit,
      onDelete: deleteTrack
    };
    renderTrackCards(grid, tracks, { ...cardOptions, emptyMessage: "Nenhuma mÃºsica disponÃ­vel." });
    renderTrackCards(likedGrid, tracks.filter(track => likedIds.has(String(track.id))), {
      ...cardOptions, emptyMessage: "Nenhuma mÃºsica curtida ainda."
    });
  }
  async function toggleLike(t){if(!user){document.getElementById("auth-modal").showModal();return;}const wasLiked=likedIds.has(String(t.id));try{await setMusicLike(user.uid,t.id,wasLiked);if(wasLiked)likedIds.delete(String(t.id));else likedIds.add(String(t.id));paint();}catch(error){console.error("Failed to update like",error);alert("Não foi possível salvar a curtida. Verifique as permissões do Realtime Database.");}}
  async function deleteTrack(t){if(!ownsTrack(t)||!t.dbKey){alert("Você não pode excluir esta música.");return;}if(!confirm("Tem certeza que deseja excluir esta música?"))return;try{await excluirMusica(user,t.dbKey);}catch(error){console.error("Falha ao excluir música",error);alert("Não foi possível excluir a música. Verifique as permissões do Realtime Database.");}}
  function openEdit(t){if(!ownsTrack(t)||!t.dbKey)return;editingTrack=t;coverWasRemoved=false;document.getElementById("song-form").reset();document.getElementById("song-title").value=t.titulo||"";document.getElementById("song-artist").value=t.artista||"";const cover=String(t.capaUrl||"");coverUrlInput.value=/^https?:\/\//i.test(cover)?cover:"";coverData="";showCoverPreview(cover);coverName.textContent="Manter capa atual";audioName.textContent="Manter áudio atual (ou escolher outro MP3)";audioFileInput.required=false;formMessage.textContent="";document.getElementById("song-modal-title").textContent="Editar música";document.getElementById("song-submit-label").textContent="Salvar alterações";songModal.showModal();}
  document.querySelectorAll(".nav-menu a[data-target]").forEach(link=>link.addEventListener("click",e=>{e.preventDefault();document.querySelectorAll(".nav-menu a").forEach(a=>a.classList.remove("active"));document.querySelectorAll(".content-section").forEach(s=>s.classList.remove("active"));link.classList.add("active");document.getElementById(link.dataset.target)?.classList.add("active");}));
  buscarMusicas((songs, records) => {
    const activeKey = player.getCurrentTrackKey();
    trackData = records;
    tracks.splice(defaultTracks.length, tracks.length - defaultTracks.length, ...songs);

    if (activeKey) {
      const activeTrack = songs.find(track => track.dbKey === activeKey);
      if (!activeTrack) {
        player.clearDeletedTrack();
      } else {
        player.syncTrack(activeTrack);
      }
    }

    paint();
  }, error => console.error("Falha ao carregar músicas do Realtime Database", error));
  let stopLikes=null;observeAuth(activeUser=>{user=activeUser;if(stopLikes){stopLikes();stopLikes=null;}likedIds.clear();document.getElementById("open-auth-modal").hidden=!!user;document.getElementById("logout-button").hidden=!user;if(user){stopLikes=watchLikes(user.uid,ids=>{likedIds=ids;paint();},error=>console.error("Failed to load likes",error));}else paint();});
  document.getElementById("logout-button").onclick=()=>logOut().catch(e=>{console.error("Falha no logout",e);alert("Não foi possível sair da conta. Tente novamente.");});
  const authForm=document.getElementById("auth-form"), authModal=document.getElementById("auth-modal");
  authForm.onsubmit=e=>{e.preventDefault();logIn(document.getElementById("auth-email").value,document.getElementById("auth-password").value).then(()=>authModal.close()).catch(e=>document.getElementById("auth-status").textContent=e.message);};
  document.getElementById("signup-button").onclick=()=>createAccount(document.getElementById("auth-email").value,document.getElementById("auth-password").value).then(()=>authModal.close()).catch(e=>document.getElementById("auth-status").textContent=e.message);
  document.getElementById("open-auth-modal").onclick=e=>{e.preventDefault();authModal.showModal();};
  const songModal = document.getElementById("song-modal");
  const songForm = document.getElementById("song-form");
  const songModalTitle = document.getElementById("song-modal-title");
  const songSubmitLabel = document.getElementById("song-submit-label");
  const coverFile = document.getElementById("song-cover-file");
  const coverPreview = document.getElementById("cover-preview");
  const coverUrlInput = document.getElementById("song-cover");
  const coverName = document.getElementById("cover-file-name");
  const audioFileInput = document.getElementById("song-audio");
  const audioName = document.getElementById("audio-file-name");
  const clearCover = document.getElementById("clear-cover");
  const formMessage = document.getElementById("song-form-message");
  let coverData = "";
  let coverWasRemoved = false;

  const showCoverPreview = source => {
    if (!source) {
      coverPreview.removeAttribute("src");
      coverPreview.hidden = true;
      clearCover.hidden = true;
      return;
    }
    coverPreview.src = source;
    coverPreview.hidden = false;
    clearCover.hidden = false;
    watchCover(coverPreview);
  };

  function resetSongForm() {
    editingTrack = null;
    songForm.reset();
    coverData = "";
    coverWasRemoved = false;
    audioFileInput.required = true;
    coverName.textContent = "Escolher imagem";
    audioName.textContent = "Escolher arquivo MP3";
    showCoverPreview("");
    formMessage.textContent = "";
    songModalTitle.textContent = "Cadastrar Nova Música";
    songSubmitLabel.textContent = "Adicionar Música";
  }

  function openCreateSongModal() {
    resetSongForm();
    songModal.showModal();
  }

  document.getElementById("open-song-modal").onclick = event => {
    event.preventDefault();
    if (!user) {
      authModal.showModal();
      return;
    }
    openCreateSongModal();
  };

  document.querySelectorAll(".modal-close").forEach(button => {
    button.onclick = () => button.closest("dialog").close();
  });

  coverUrlInput.addEventListener("input", () => {
    coverData = "";
    coverWasRemoved = false;
    coverFile.value = "";
    coverName.textContent = "Escolher imagem";
    const url = coverUrlInput.value.trim();
    if (!url) {
      showCoverPreview("");
      return;
    }
    try {
      const parsedUrl = new URL(url);
      showCoverPreview(["http:", "https:"].includes(parsedUrl.protocol) ? url : "");
    } catch {
      showCoverPreview("");
    }
  });

  coverFile.onchange = () => {
    const file = coverFile.files[0];
    if (!file) return;
    const allowedType = ["image/png", "image/jpeg", "image/webp"].includes(file.type) || /\.(png|jpe?g|webp)$/i.test(file.name);
    if (!allowedType || file.size > 2 * 1024 * 1024) {
      formMessage.textContent = "Escolha uma imagem PNG, JPG ou WEBP de até 2 MB.";
      coverFile.value = "";
      coverData = "";
      coverName.textContent = "Escolher imagem";
      showCoverPreview("");
      return;
    }
    formMessage.textContent = "";
    coverWasRemoved = false;
    coverUrlInput.value = "";
    coverName.textContent = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      coverData = reader.result;
      showCoverPreview(coverData);
    };
    reader.onerror = () => { formMessage.textContent = "Não foi possível ler a imagem. Tente outro arquivo."; };
    reader.readAsDataURL(file);
  };

  clearCover.onclick = () => {
    coverData = "";
    coverWasRemoved = true;
    coverFile.value = "";
    coverUrlInput.value = "";
    coverName.textContent = "Escolher imagem";
    showCoverPreview("");
  };

  audioFileInput.onchange = () => {
    const file = audioFileInput.files[0];
    audioName.textContent = file ? file.name : (editingTrack ? "Manter áudio atual" : "Escolher arquivo MP3");
    formMessage.textContent = "";
  };

  songForm.onsubmit = async event => {
    event.preventDefault();
    formMessage.textContent = "";
    const activeUser = auth.currentUser;
    const trackToEdit = editingTrack;
    if (!activeUser) {
      formMessage.textContent = "Entre na conta para cadastrar músicas.";
      return;
    }
    if (trackToEdit && !ownsTrack(trackToEdit)) {
      formMessage.textContent = "Você não pode editar esta música.";
      return;
    }

    const title = document.getElementById("song-title").value.trim();
    const artist = document.getElementById("song-artist").value.trim();
    const audioFile = audioFileInput.files[0];
    const coverUrl = coverUrlInput.value.trim();
    if (!title || !artist) {
      formMessage.textContent = "Preencha o título e o artista.";
      return;
    }
    if (!audioFile && !trackToEdit) {
      formMessage.textContent = "Selecione um arquivo MP3.";
      return;
    }
    if (audioFile && (!audioFile.name.toLowerCase().endsWith(".mp3") || (audioFile.type && !["audio/mpeg", "audio/mp3", "application/octet-stream"].includes(audioFile.type)))) {
      formMessage.textContent = "O arquivo selecionado precisa ser MP3.";
      return;
    }
    if (audioFile && audioFile.size > 5 * 1024 * 1024) {
      formMessage.textContent = "O arquivo MP3 deve ter no máximo 5 MB.";
      return;
    }
    if (!coverData && !coverUrl && !trackToEdit) {
      formMessage.textContent = "Informe uma URL de capa ou selecione uma imagem.";
      return;
    }
    if (coverUrl) {
      try {
        const parsedUrl = new URL(coverUrl);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error("invalid protocol");
      } catch {
        formMessage.textContent = "Informe uma URL de imagem válida (http ou https).";
        return;
      }
    }

    const submitButton = songForm.querySelector("[type=submit]");
    submitButton.disabled = true;
    const saveSong = async audioUrl => {
      const musicChanges = {
        titulo: title,
        artista: artist,
        audioUrl,
        capaUrl: coverData || coverUrl || (coverWasRemoved ? "" : trackToEdit?.capaUrl || "")
      };
      try {
        if (trackToEdit) await atualizarMusica(activeUser, trackToEdit.dbKey, musicChanges);
        else await criarMusica(activeUser, musicChanges);
        resetSongForm();
        songModal.close();
      } catch (error) {
        console.error("Falha ao salvar música no Realtime Database", error);
        formMessage.textContent = error.message || "Não foi possível salvar. Verifique a conexão e as permissões.";
      } finally {
        submitButton.disabled = false;
      }
    };

    if (!audioFile) {
      await saveSong(trackToEdit.audioUrl);
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => {
      formMessage.textContent = "Não foi possível ler o MP3. Tente outro arquivo.";
      submitButton.disabled = false;
    };
    reader.onload = () => { void saveSong(reader.result); };
    reader.readAsDataURL(audioFile);
  };

  let installPrompt=null;const installButton=document.getElementById("install-app-button");const isInstalled=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
  window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();if(isInstalled())return;installPrompt=event;installButton.hidden=false;});
  installButton.onclick=async()=>{if(!installPrompt)return;const prompt=installPrompt;installPrompt=null;try{await prompt.prompt();await prompt.userChoice;}catch(error){console.warn("O prompt de instalação não pôde ser concluído.",error);}finally{installButton.hidden=true;}};
  window.addEventListener("appinstalled",()=>{installPrompt=null;installButton.hidden=true;});
  paint();player.loadTrack(tracks[0]);
});
