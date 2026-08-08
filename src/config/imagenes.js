// Centralito de URLs de imágenes que todavía no tienen dueño en el admin
// (no son productos, así que no pasan por el panel). Subí el archivo a
// Ferozo/DonWeb — por FTP, con un cliente tipo FileZilla, o por el File
// Manager de cPanel — a la carpeta public_html/img/, y pegá acá la URL
// pública resultante (ej: 'https://byvalentinam.com/img/valentina.jpg').
//
// Mientras el valor quede en '', la página muestra un placeholder en su lugar.
// No hace falta tocar ningún otro archivo: cambiás el valor acá y se
// actualiza solo en la página correspondiente.

export const IMAGENES = {
  // Foto de Valentina en "Sobre mí"
  fotoValentina: '/img/valentina-sobre-mi.png',

  // Imagen debajo de "¿Qué es Diseño Humano?"
  disenoHumano: '/img/diseno-humano-bodygraph.png',
}
