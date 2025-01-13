const compliments = [
    "Your smile lights up the whole room! ✨",
    "You have the most adorable laugh ever! 🎵",
    "Your creativity knows no bounds! 🎨",
    "You make everyone around you happier! 🌟",
    "Your kindness is truly inspiring! 💖",
    "You're absolutely gorgeous inside and out! 🌸",
    "Your positive energy is contagious! ⚡",
    "You're stronger than you know! 💪",
    "Your heart is made of pure gold! 💝",
    "You deserve all the happiness in the world! 🌈",
    "Your presence makes everything better! 🌺",
    "You're simply amazing at being you! 🎭",
    "Your determination is admirable! 🎯",
    "You're the sweetest person ever! 🍯",
    "Your personality is a perfect mix of cute and smart! 🦊"
];

const newCompliments = [
    "Your attention to detail is remarkable! 🔍",
    "The way you care for others is beautiful! 🌺",
    "Your fashion sense is absolutely fabulous! 👗",
    "You make ordinary moments extraordinary! ✨",
    "Your problem-solving skills are impressive! 🧩",
    "You have the most contagious enthusiasm! 🎉",
    "Your imagination is absolutely magical! 🌈",
    "You're like a ray of sunshine on a cloudy day! ☀️",
    "Your dedication to growth is inspiring! 🌱",
    "You have such a beautiful soul! 💫"
];

compliments.push(...newCompliments);

const confettiColors = ['#ff69b4', '#87ceeb', '#ffd1dc', '#e0f4ff', '#ffb6c1'];

const clickSound = document.getElementById('click-sound');
const saveSound = document.getElementById('save-sound');
const complimentText = document.getElementById('compliment-text');
const generateBtn = document.getElementById('generate-btn');
const saveBtn = document.getElementById('save-btn');
const favoritesList = document.getElementById('favorites-list');

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

function generateCompliment() {
    clickSound.play();
    createConfetti();
    const randomIndex = Math.floor(Math.random() * compliments.length);
    complimentText.textContent = compliments[randomIndex];
    
    // Add bounce animation to compliment text
    complimentText.classList.add('bounce');
    setTimeout(() => complimentText.classList.remove('bounce'), 1000);
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'floating-heart');
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

function saveCompliment(event) {
    const compliment = complimentText.textContent;
    if (compliment && !favorites.includes(compliment)) {
        saveSound.play();
        favorites.push(compliment);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesList();
        
        // Create floating hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    event.clientX - 10 + Math.random() * 20,
                    event.clientY - 10 + Math.random() * 20
                );
            }, i * 100);
        }
    }
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Show temporary success message
        const message = document.createElement('div');
        message.classList.add('copy-message');
        message.textContent = '✨ Copied! ✨';
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach((compliment, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${compliment}
            <div class="button-group">
                <button class="copy-btn" onclick="copyToClipboard('${compliment.replace(/'/g, "\\'")}')">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="delete-btn" onclick="deleteCompliment(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        favoritesList.appendChild(li);
    });
}

function deleteCompliment(index) {
    clickSound.play();
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
}

generateBtn.addEventListener('click', generateCompliment);
saveBtn.addEventListener('click', saveCompliment);

// Initial favorites list update
updateFavoritesList(); 