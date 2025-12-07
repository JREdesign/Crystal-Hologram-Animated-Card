const cardsData = [
    // --- Cartas Originales ---
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

const cardsGrid = document.getElementById('cardsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Función para renderizar las cartas
function renderCards(filter = 'all') {
    cardsGrid.innerHTML = ''; // Limpiar grid

    const filteredCards = filter === 'all'
        ? cardsData
        : cardsData.filter(card => card.rarity === filter);

    filteredCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.animationDelay = `${index * 0.1}s`; // Stagger animation

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-shine"></div>
                <div class="card-glare"></div>
                <img src="${card.image}" alt="${card.title}" class="card-bg">
                <div class="card-content">
                    <span class="card-rarity rarity-${card.rarity}">${card.rarity}</span>
                    <h2 class="card-title">${card.title}</h2>
                    <p class="card-type">${card.type}</p>
                </div>
            </div>
        `;

        // Añadir eventos de ratón para efecto 3D
        cardElement.addEventListener('mousemove', handleMouseMove);
        cardElement.addEventListener('mouseleave', handleMouseLeave);

        cardsGrid.appendChild(cardElement);
    });
}

// --- 3D Tilt Effect Logic ---
function handleMouseMove(e) {
    const card = e.currentTarget;
    const shine = card.querySelector('.card-shine');
    const rect = card.getBoundingClientRect();

    // Mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotation (max 20 degrees for more pop)
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    // Apply perspective directly to the element for consistent 3D effect in grid
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Holographic Shine Movement
    const bgPosX = ((x / rect.width) * 100);
    const bgPosY = ((y / rect.height) * 100);

    shine.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;

    // Glare Position
    card.style.setProperty('--pointer-x', `${x}px`);
    card.style.setProperty('--pointer-y', `${y}px`);
}

function handleMouseLeave(card) {
    const shine = card.querySelector('.card-shine'); // Corregido: target es el evento, necesitamos el elemento
    // Si llamamos a handleMouseLeave directamente pasamos 'this' o el elemento,
    // pero si es un evento listener, el argumento es 'e'.
    // Ajustamos para que funcione con el event listener:
    const targetCard = card.currentTarget || card; // Soporta llamada directa o evento
    const targetShine = targetCard.querySelector('.card-shine');

    // Reset with perspective
    targetCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    if (targetShine) targetShine.style.backgroundPosition = 'center';
}

// --- Filter Logic ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        renderCards(filterValue);
    });
});

// Initial Render
renderCards();