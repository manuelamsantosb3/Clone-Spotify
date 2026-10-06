import { db } from "./firebase-config.js";
import { onValue, ref, remove, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export function watchLikes(userId, onChange, onError) {
  return onValue(ref(db, `curtidas/${userId}`), snapshot => {
    onChange(new Set(Object.keys(snapshot.val() || {})));
  }, onError);
}

export async function setMusicLike(userId, musicId, isLiked) {
  const likeRef = ref(db, `curtidas/${userId}/${musicId}`);
  if (isLiked) await remove(likeRef);
  else await set(likeRef, true);
}
