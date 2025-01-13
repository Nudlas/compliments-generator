const mediaItems = [
    {
        type: 'image',
        title: "Match my freak",
        url: "/compliments-generator/images/freak.jpg",  // Update path to include repo name
        description: "✨ A lovely moment"
    },
    {
        type: 'video',
        title: "Us Core type shit",
        url: "/compliments-generator/videos/core.mp4",  // Update path to include repo name
        description: "💖 Remember this?"
    },
    {
        type: 'image',
        title: "Touch my freak",
        url: "/compliments-generator/images/touch.jpg",
        description: "🌟 Such a special day"
    },
    {
        type: 'video',
        title: "I love crackers",
        url: "/compliments-generator/videos/love.mp4",
        description: "💖 Remember this?"
    },
    {
        type: 'video',
        title: "Good Morning",
        url: "/compliments-generator/videos/hey.mp4",
        description: "💖 Remember this?"
    }
    // Add more images or videos
];

const confettiColors = ['#ff69b4', '#87ceeb', '#ffd1dc', '#e0f4ff', '#ffb6c1'];

const clickSound = document.getElementById('click-sound');
const saveSound = document.getElementById('save-sound');
const mediaContainer = document.getElementById('video-container'); // kept same ID for compatibility
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

function generateMedia() {
    clickSound.play();
    createConfetti();
    const randomIndex = Math.floor(Math.random() * mediaItems.length);
    const media = mediaItems[randomIndex];
    
    const mediaContent = media.type === 'video' 
        ? `<video 
             width="100%" 
             height="315" 
             controls
             playsinline
           >
             <source src="${media.url}" type="video/mp4">
             Your browser does not support the video tag.
           </video>`
        : `<img 
             src="${media.url}" 
             alt="${media.title}"
             class="media-image"
           >`;
    
    mediaContainer.innerHTML = `
        <div class="media-wrapper">
            ${mediaContent}
            <h3>${media.title}</h3>
            <p>${media.description}</p>
        </div>
    `;
    
    mediaContainer.classList.add('bounce');
    setTimeout(() => mediaContainer.classList.remove('bounce'), 1000);
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'floating-heart');
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

function saveMedia(event) {
    const currentMedia = mediaItems.find(m => {
        const mediaElement = mediaContainer.querySelector('video source, img');
        if (!mediaElement) return false;
        
        const mediaUrl = mediaElement.tagName === 'IMG' 
            ? mediaElement.src 
            : mediaElement.parentElement.querySelector('source').src;
            
        return m.url === mediaUrl.replace(window.location.origin, '.');
    });
    
    if (currentMedia && !favorites.some(f => f.url === currentMedia.url)) {
        saveSound.play();
        favorites.push(currentMedia);
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

function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach((media, index) => {
        const mediaContent = media.type === 'video' 
            ? `<video 
                 width="200" 
                 height="150" 
                 controls
                 playsinline
               >
                 <source src="${media.url}" type="video/mp4">
                 Your browser does not support the video tag.
               </video>`
            : `<img 
                 src="${media.url}" 
                 alt="${media.title}"
                 class="favorite-image"
               >`;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="media-favorite">
                ${mediaContent}
                <div class="media-info">
                    <h4>${media.title}</h4>
                    <p>${media.description}</p>
                </div>
                <div class="button-group">
                    <button class="delete-btn" onclick="deleteMedia(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        favoritesList.appendChild(li);
    });
}

function deleteMedia(index) {
    clickSound.play();
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
}

generateBtn.addEventListener('click', generateMedia);
saveBtn.addEventListener('click', saveMedia);

// Initial favorites list update
updateFavoritesList(); 