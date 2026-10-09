# Club Atletismo Chapín Jerez

Web oficial del Club Atletismo Chapín Jerez, de Jerez de la Frontera. Es una web estática: HTML, CSS y JavaScript. No hay base de datos, ni PHP, ni panel de administración, ni nada que instalar. Se sube a cualquier hosting y ya funciona.

Si has llegado aquí para tocar algo, esto te ayuda a orientarte.

## Qué hay dentro

```
index.html               portada
club/                    historia, valores y palmarés
galeria/                 fotos, con visor
noticias/                novedades y crónicas
calendario/              competiciones de la temporada
gran-actuacion-en-algeciras/
festival-de-medallas/    crónicas de competición, una carpeta cada una
alejandra-orozco-campeona-de-espana/
campeonato/
aviso-legal/
politica-de-privacidad/  textos legales
politica-de-cookies/
404.html                 página de error
assets/
  css/main.css           todo el diseño, en un solo archivo
  js/main.js             menú móvil, animaciones y visor de fotos
  fonts/                 tipografías (se sirven desde aquí, no desde Google)
  img/                   fotos en tres tamaños y el escudo
sitemap.xml, robots.txt  para buscadores
site.webmanifest         datos de la web para el móvil
```

Cada página es una carpeta con su `index.html`, así las direcciones quedan limpias: `/club/`, `/noticias/`, etc.

## Verla en local

Abrir `index.html` con doble clic casi funciona, pero los enlaces a carpetas (`/club/`) no se resuelven bien desde un archivo suelto. Es mejor servirla con cualquier servidor estático. Por ejemplo, si tienes Python:

```
python -m http.server 8080
```

o la extensión Live Server de VS Code. Y se abre http://localhost:8080.

## Cómo cambiar cosas

Es HTML normal, se edita a mano.

**Un texto.** Abre el `index.html` de la página correspondiente y búscalo. Los horarios, por ejemplo, están en `index.html`, en la sección con `id="horarios"`.

**Una noticia.** En `noticias/index.html` cada noticia es un bloque `<article class="news-card">`. Copia uno y cambia fecha, título y texto. El texto que se despliega con "Leer más" va dentro del `<details>`.

**Un evento del calendario.** En `calendario/index.html`, copia un `<li class="event">`.

**Una foto.** Mete tres versiones en `assets/img/` con los nombres `foto-480.jpg`, `foto-960.jpg` y `foto-1600.jpg` (480, 960 y 1600 píxeles de ancho) y úsala así:

```html
<img src="../assets/img/foto-960.jpg"
     srcset="../assets/img/foto-480.jpg 480w, ../assets/img/foto-960.jpg 960w, ../assets/img/foto-1600.jpg 1600w"
     sizes="100vw" width="1600" height="1067" alt="Describe lo que se ve">
```

La ruta `../` depende de lo profunda que esté la página: en `index.html` es `./`, en `club/index.html` es `../`.

**Los colores y las tipografías.** Están como variables al principio de `assets/css/main.css`.

**El menú y el pie.** Son iguales en todas las páginas, así que si cambias un enlace hay que cambiarlo en cada `index.html`.

## Si cambia el dominio

Los enlaces para compartir en redes, el `sitemap.xml` y la URL canónica de cada página llevan escrito `https://chapinjerez.rf.gd`. Si pasas a otro dominio, haz una búsqueda y reemplazo de esa dirección en todo el proyecto.

## Publicarla

Sube todo el contenido (lo de dentro, no la carpeta) a la carpeta pública del hosting por FTP o desde su administrador de archivos. En InfinityFree es `htdocs`.

## Cosas que conviene saber

- Varias fotos de las noticias recientes vienen de la página de Facebook del club, y algunas de las primeras son imágenes generadas, no fotografías reales. Si hay fotos mejores, se pueden cambiar sin tocar nada más.
- La web no usa cookies ni analítica, por eso no hay aviso de cookies.
- Los textos legales los tiene que revisar quien lleve esa parte del club.
- Algunas fechas del calendario están deducidas de las publicaciones del club y no de una agenda oficial. Si alguna falla, se corrige en `calendario/index.html`.
- No hay formulario de contacto: se contacta por correo, teléfono y WhatsApp.

## Licencia

El código se puede reutilizar. Los textos, el escudo y las fotografías pertenecen al Club Atletismo Chapín Jerez y a sus autores.
