# TCG Verse – Card Explorer

Explorador interactivo de cartas con efectos holográficos, transformaciones 3D y un sistema dinámico de filtrado por rareza.  
Este proyecto recrea la experiencia visual de una colección *premium* de cartas digitales, combinando una estética moderna con animaciones fluidas y una interfaz altamente reactiva.

---

## 🌌 Descripción general

**TCG Verse – Card Explorer** es una aplicación web diseñada para presentar colecciones de cartas con un acabado visual impactante. Está pensada para:

- Juegos de cartas coleccionables (TCG / CCG)
- Catálogos de arte conceptual
- Galerías digitales o NFTs
- Cualquier experiencia donde el diseño visual sea esencial

Cada carta se genera dinámicamente a partir de un dataset en JavaScript (`cardsData`), y el usuario puede filtrarlas por rareza:

- `legendary`
- `epic`
- `rare`

Además, cada carta responde en tiempo real al movimiento del cursor mediante un efecto 3D con brillo holográfico, logrando una sensación de objeto físico interactivo dentro del navegador.

---

## 🚀 Características principales

### 🔍 Explorador con sistema de filtros

En el encabezado se muestra una barra de filtros con botones:

- **All Cards** → Muestra todas las cartas.
- **Legendary** → Muestra únicamente cartas legendarias.
- **Epic** → Muestra únicamente cartas épicas.
- **Rare** → Muestra únicamente cartas raras.

Cada botón tiene un atributo `data-filter` que se usa para controlar la lógica de filtrado.  
Al hacer clic en un botón:

- Se actualiza la clase `active` del botón seleccionado.
- Se llama a `renderCards(filterValue)`, que filtra el array `cardsData` y vuelve a pintar el grid.

Todo el comportamiento es 100 % en el cliente, sin recarga de página.

---

### 🃏 Renderizado dinámico de cartas

Las cartas se crean desde un array de objetos en `script.js`:

    const cardsData = [
        {
            id: 1,
            title: "Cosmic Dragon",
            rarity: "legendary",
            type: "Dragon",
            image: "assets/images/cosmic_dragon.png"
        },
        {
            id: 2,
            title: "Solar Phoenix",
            rarity: "legendary",
            type: "Beast",
            image: "assets/images/solar_phoenix.png"
        },
        {
            id: 3,
            title: "Void Walker",
            rarity: "epic",
            type: "Sorcerer",
            image: "assets/images/void_walker.png"
        },
        {
            id: 4,
            title: "Cyber Ninja",
            rarity: "epic",
            type: "Warrior",
            image: "assets/images/cyber_ninja.png"
        },
        {
            id: 5,
            title: "Crystal Golem",
            rarity: "rare",
            type: "Construct",
            image: "assets/images/crystal_golem.png"
        },
        {
            id: 6,
            title: "Neon Samurai",
            rarity: "rare",
            type: "Cybernetic",
            image: "assets/images/neon_samurai.png"
        },
        {
            id: 7,
            title: "Spectral Lancer",
            rarity: "epic",
            type: "Spirit",
            image: "assets/images/spectral_lancer.png"
        },
        {
            id: 8,
            title: "Plasma Wisp",
            rarity: "rare",
            type: "Elemental",
            image: "assets/images/plasma_wisp.png"
        }
    ];

La función `renderCards(filter = 'all')`:

- Limpia el contenedor principal (`cardsGrid.innerHTML = ''`).
- Calcula `filteredCards` según la rareza seleccionada.
- Crea dinámicamente un elemento `div.card` por cada carta.
- Inserta en su interior:
  - Imagen (`img.card-bg`)
  - Rareza (`.card-rarity` con clases `rarity-legendary`, `rarity-epic`, `rarity-rare`)
  - Título (`.card-title`)
  - Tipo (`.card-type`)
- Añade listeners para el efecto 3D (`mousemove` y `mouseleave`).
- Aplica un `animationDelay` progresivo para conseguir un efecto escalonado al mostrar múltiples cartas.

---

### 🎨 Efecto holográfico avanzado

Cada carta combina varias capas y estilos:

- Contenedor `.card` con:
  - `transform-style: preserve-3d;`
  - `transition: transform 0.1s;`
  - `border-radius: 20px;`
  - `border: 1px solid rgba(255, 255, 255, 0.1);`
- Imagen principal `.card-bg`:
  - `object-fit: contain;` para mostrar la ilustración completa sin recorte.
  - `filter: drop-shadow(...)` para separar visualmente la carta del fondo.
  - Efecto zoom con `transform: scale(1.05)` al hacer hover.
- Capa holográfica `.card-shine`:
  - Gradiente multicolor animado.
  - `mix-blend-mode: color-dodge;` para un brillo iridiscente muy marcado.
- Capa de destello `.card-glare`:
  - Gradiente radial que sigue la posición del puntero.
  - Simula un punto de luz especular moviéndose sobre la carta.
- Contenido `.card-content`:
  - Posicionado al final de la carta.
  - Utiliza `translateZ(40px)` para dar profundidad al texto.

---

### 🧠 Interacción sensible al cursor (3D Tilt Effect)

La lógica principal del efecto 3D se encuentra en `handleMouseMove` y `handleMouseLeave`.

Fragmentos clave:

    function handleMouseMove(e) {
        const card = e.currentTarget;
        const shine = card.querySelector('.card-shine');
        const rect = card.getBoundingClientRect();

        // Posición del ratón relativa a la carta
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Rotación (máx. ±20 grados)
        const rotateX = ((y - centerY) / centerY) * -20;
        const rotateY = ((x - centerX) / centerX) * 20;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Movimiento del brillo holográfico
        const bgPosX = (x / rect.width) * 100;
        const bgPosY = (y / rect.height) * 100;

        shine.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;

        // Posición del destello especular
        card.style.setProperty('--pointer-x', `${x}px`);
        card.style.setProperty('--pointer-y', `${y}px`);
    }

    function handleMouseLeave(card) {
        const targetCard = card.currentTarget || card;
        const targetShine = targetCard.querySelector('.card-shine');

        targetCard.style.transform =
            'perspective(1000px) rotateX(0) rotateY(0)';

        if (targetShine) {
            targetShine.style.backgroundPosition = 'center';
        }
    }

Con esto se consigue:

- Un efecto de carta que "sigue" el movimiento del ratón.
- Un brillo que se desplaza como si fuese una textura holográfica real.
- Un punto de luz que da la sensación de material brillante metálico o nacarado.

---

## 🗂️ Estructura del proyecto

    /
    ├── index.html        # Estructura principal del explorador
    ├── styles.css        # Estilos 3D, holográficos y diseño general
    ├── script.js         # Lógica de filtrado, interacción y renderizado
    └── assets/
        └── images/       # Imágenes de las cartas (PNG, etc.)

### index.html

- Define la estructura base del layout:

  - `header.main-header` con:
    - Logo: “TCG VERSE” con un span `.highlight` en gradiente.
    - Subtítulo: “Premium Card Collection”.
  - Navegación de filtros `nav.filter-nav` con botones:
    - `button.filter-btn` con `data-filter="all" | "legendary" | "epic" | "rare"`.
  - Contenedor principal `#cardsGrid` donde se inyectan las cartas.

- Importa:
  - Google Fonts (`Outfit`).
  - `styles.css`.
  - `script.js`.

### styles.css

- Define variables globales y reset:

  - Colores base (`--bg-color`, `--card-bg`, `--accent-color`, etc.).
  - Tipografía principal: `--font-main: 'Outfit', sans-serif`.

- Estilos generales:

  - Fondo con color oscuro (`var(--bg-color)`).
  - Layout vertical con `display: flex` y `flex-direction: column`.

- Header:

  - Header sticky con `backdrop-filter: blur(10px)` y degradado de fondo.
  - Logo central con fuente grande y `span.highlight` en gradiente.

- Filtros:

  - Botones con borde redondeado, estilos hover y clase `active`.
  - Transiciones suaves (`transition: all 0.3s ease`).

- Grid de cartas:

  - `display: grid;`
  - `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));`
  - `gap: 3rem;`
  - `max-width: 1400px;` centrado.

- Carta:

  - Contenedor `.card` con `aspect-ratio: 2/3`.
  - `transform-style: preserve-3d;` para efectos 3D.
  - Bordes redondeados y borde sutil translúcido.

- Rarezas:

  - `.rarity-legendary` → amarillo dorado.
  - `.rarity-epic` → violeta.
  - `.rarity-rare` → azul.

- Responsive:

  - Ajustes de tipografía y separación para pantallas pequeñas (`@media (max-width: 768px)`).

### script.js

- Define el array `cardsData` con las cartas iniciales.
- Selecciona elementos clave del DOM:

  - `const cardsGrid = document.getElementById('cardsGrid');`
  - `const filterBtns = document.querySelectorAll('.filter-btn');`

- Funciones principales:

  - `renderCards(filter)`:
    - Vuelca en el DOM las cartas filtradas por rareza.
  - `handleMouseMove(e)`:
    - Gestiona la rotación 3D y el movimiento de brillos.
  - `handleMouseLeave(card)`:
    - Resetea la carta al estado inicial.
  - Lógica de filtros:
    - `filterBtns.forEach(btn => { btn.addEventListener('click', ...) })`.

- Render inicial:

  - `renderCards();` para mostrar todas las cartas al cargar la página.

---

## ✨ Tecnologías empleadas


- **Transformaciones 3D en CSS:**  
  Permiten rotar la carta en un espacio tridimensional realista, generando la impresión de volumen y respuesta física a la luz.

- **Gradientes y modos de fusión (*blend modes*):**  
  Se utilizan para crear el brillo iridiscente y los reflejos metálicos propios de un efecto holográfico.

- **JavaScript:**  
  Calcula la posición del cursor en tiempo real y actualiza variables CSS personalizadas, haciendo que toda la composición reaccione suavemente al movimiento.

---

## 🪄 Explicación de los efectos visuales

Para entender qué aporta ese toque casi “mágico”, conviene fijarse en varios detalles esenciales:

### 📐 Perspectiva tridimensional

- `perspective: 1000px;` aplicada en el contexto de transformación es imprescindible para que la rotación en los ejes X e Y tenga profundidad real.  
- Sin esta propiedad, la carta se vería plana y sin volumen, como una simple rotación 2D.

### 🌈 Mezcla de colores y brillo holográfico

- `mix-blend-mode: color-dodge;` es la clave del efecto holográfico.  
  Este modo hace que los colores del brillo aparezcan solo en las zonas más claras, simulando cómo la luz real se refleja en una superficie iridiscente.

### 🔮 Doble capa de iluminación

- `.card-shine` (Brillo holográfico):  
  Utiliza un gradiente lineal con tonos translúcidos y neón.  
  Su posición se actualiza desde JavaScript en función de la posición del ratón, dando la sensación de que la textura cambia según el ángulo de visión.

- `.card-glare` (Destello puntual):  
  Es un gradiente radial blanco que sigue exactamente al ratón, simulando el punto donde la luz incide con mayor intensidad sobre la superficie de la carta.

### 🪂 Profundidad en el texto

- `translateZ(30px)` / `translateZ(40px)` sobre el contenido de la carta:  
  Desplaza el texto hacia afuera, separándolo del fondo.  
  Al rotar la carta, el texto parece flotar sobre la imagen, creando un elegante efecto *parallax*.

---

## 🧪 Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Asegurarse de mantener la estructura de carpetas:

   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/images/...`

3. Abrir `index.html` en un navegador moderno (Chrome, Firefox, Edge…).
4. Mover el ratón sobre las cartas y utilizar los filtros para explorar la colección.

No se requiere ningún *build step* ni dependencia externa adicional: es un proyecto totalmente *vanilla* (HTML + CSS + JS).

---

## 🌟 Casos de uso recomendados

- Prototipo visual para un TCG/CCG.
- Portafolio de ilustración con cartas temáticas.
- Landing page para proyectos NFT o colecciones digitales.
- Demostraciones de UI avanzadas con efectos 3D y holográficos.

---

## 📌 Ideas de mejora futura

- Añadir más rarezas y tipos de carta.
- Incluir un buscador por nombre o tipo.
- Integrar animaciones de entrada/salida al cambiar de filtro.
- Conectar los datos a un backend o API real.
- Añadir un modo oscuro/claro con toggle.

---
