// Extrae el ID de un link de YouTube en cualquiera de sus formatos usuales
// (youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID, /shorts/ID).
export function getYoutubeId(url) {
  if (!url) return null
  const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

// Miniatura pública de YouTube para ese link, o null si no es un link válido.
export function getYoutubeThumb(url) {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}
