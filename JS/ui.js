function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function watchImage(image, fallbackCover) {
  image.onerror = () => {
    image.onerror = null;
    image.src = fallbackCover;
  };
}

function createTrackCard(track, options) {
  const { likedIds, fallbackCover, onLike, onPlay, onEdit, onDelete, isOwner } = options;
  const liked = likedIds.has(String(track.id));
  const title = escapeHtml(track.titulo);
  const artist = escapeHtml(track.artista);
  const card = document.createElement("article");
  card.className = "track-card";
  card.tabIndex = 0;
  card.setAttribute("aria-label", `${track.titulo} — ${track.artista}. Clique para reproduzir.`);
  card.innerHTML = `<button type="button" class="card-like-btn ${liked ? "liked" : ""}" title="${liked ? "Descurtir música" : "Curtir música"}" aria-label="${liked ? "Descurtir" : "Curtir"} ${title}"><i class="fa-${liked ? "solid" : "regular"} fa-heart"></i></button><div class="cover-wrapper"><img src="${escapeHtml(track.capaUrl || fallbackCover)}" alt="Capa de ${title}"><button type="button" class="card-play-btn" title="Reproduzir ${title}" aria-label="Reproduzir ${title}"><i class="fa-solid fa-play"></i></button></div><div class="track-card-info"><h4>${title}</h4><p>${artist}</p></div>`;

  watchImage(card.querySelector("img"), fallbackCover);
  card.querySelector(".card-like-btn").onclick = () => onLike(track);
  card.querySelector(".card-play-btn").onclick = () => onPlay(track);

  if (isOwner(track)) {
    const actions = document.createElement("div");
    actions.className = "track-owner-actions";
    for (const [label, className, handler] of [
      ["Editar", "track-edit-btn", onEdit],
      ["Excluir", "track-delete-btn", onDelete]
    ]) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = className;
      button.textContent = label;
      button.onclick = () => handler(track);
      actions.append(button);
    }
    card.append(actions);
  }

  card.onclick = event => {
    if (!event.target.closest("button")) onPlay(track);
  };
  card.onkeydown = event => {
    if ((event.key === "Enter" || event.key === " ") && !event.target.closest("button")) {
      event.preventDefault();
      onPlay(track);
    }
  };
  return card;
}

export function renderTrackCards(target, tracks, options) {
  target.replaceChildren();
  if (!tracks.length) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "library-status";
    emptyMessage.textContent = options.emptyMessage;
    target.append(emptyMessage);
    return;
  }
  for (const track of tracks) target.append(createTrackCard(track, options));
}
