import { db } from "./firebase-config.js";
import { get, onValue, push, ref, remove, set, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const MUSIC_PATH = "musicas";
const OWNER_FIELDS = ["ownerId", "userId", "criadoPor", "uid"];

function valueFrom(data, names) {
  for (const name of names) {
    const value = data?.[name];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value && typeof value === "object") {
      for (const nestedName of ["url", "data", "base64"]) {
        if (typeof value[nestedName] === "string" && value[nestedName].trim()) return value[nestedName].trim();
      }
    }
  }
  return "";
}

function audioFrom(data) {
  const audio = valueFrom(data, ["audioUrl", "audio", "urlAudio", "arquivoAudio", "arquivo", "mp3", "audioBase64", "mp3Url", "url_mp3"]);
  if (/^(data:audio\/|https?:\/\/|blob:)/i.test(audio)) return audio;
  if (/^data:application\/octet-stream/i.test(audio)) return audio.replace(/^data:application\/octet-stream/i, "data:audio/mpeg");
  if (audio.length > 512 && /^[A-Za-z0-9+/\s]+={0,2}$/.test(audio)) return `data:audio/mpeg;base64,${audio.replace(/\s/g, "")}`;
  return audio;
}

function coverFrom(data) {
  const cover = valueFrom(data, ["capaUrl", "capa", "cover", "coverUrl", "imagem", "imageUrl", "coverBase64", "imagemBase64"]);
  if (/^(data:image\/|https?:\/\/)/i.test(cover)) return cover;
  if (cover.length > 128 && /^[A-Za-z0-9+/\s]+={0,2}$/.test(cover)) return `data:image/jpeg;base64,${cover.replace(/\s/g, "")}`;
  return cover;
}

function normalizeMusic(key, value) {
  const data = value && typeof value === "object" ? value : {};
  return {
    ...data,
    dbKey: key,
    id: data.id ?? key,
    ownerId: OWNER_FIELDS.map(field => data[field]).find(Boolean) || "",
    titulo: data.titulo || data.title || data.nome || "Sem título",
    artista: data.artista || data.artist || data.autor || "Artista desconhecido",
    audioUrl: audioFrom(data),
    capaUrl: coverFrom(data)
  };
}

export function isMusicOwner(music, user) {
  if (!music || !user?.uid) return false;
  return OWNER_FIELDS.some(field => music[field] && String(music[field]) === user.uid);
}

export function buscarMusicas(onSongs, onError) {
  return onValue(ref(db, MUSIC_PATH), snapshot => {
    const records = snapshot.val() || {};
    const songs = Object.entries(records).map(([key, value]) => normalizeMusic(key, value));
    onSongs(songs, records);
  }, onError);
}

export async function criarMusica(user, music) {
  if (!user?.uid) throw new Error("É necessário entrar na conta para cadastrar músicas.");
  const songRef = push(ref(db, MUSIC_PATH));
  await set(songRef, {
    id: songRef.key,
    titulo: music.titulo,
    artista: music.artista,
    audioUrl: music.audioUrl,
    capaUrl: music.capaUrl,
    ownerId: user.uid,
    criadoPor: user.uid,
    criadoEm: Date.now()
  });
  return songRef.key;
}

async function getOwnedMusic(user, musicKey) {
  if (!user?.uid || !musicKey) throw new Error("Música ou usuário inválido.");
  const songRef = ref(db, `${MUSIC_PATH}/${musicKey}`);
  const snapshot = await get(songRef);
  if (!snapshot.exists()) throw new Error("Esta música não existe mais.");
  const music = snapshot.val();
  if (!isMusicOwner(music, user)) throw new Error("Você não é o proprietário desta música.");
  return songRef;
}

export async function atualizarMusica(user, musicKey, changes) {
  const songRef = await getOwnedMusic(user, musicKey);
  const allowedChanges = {
    titulo: changes.titulo,
    artista: changes.artista,
    audioUrl: changes.audioUrl,
    capaUrl: changes.capaUrl,
    ownerId: user.uid,
    criadoPor: user.uid
  };
  await update(songRef, allowedChanges);
}

export async function excluirMusica(user, musicKey) {
  const songRef = await getOwnedMusic(user, musicKey);
  await remove(songRef);
}
