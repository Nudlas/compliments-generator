const videos = [
    {
        title: "Cute Video 1",
        url: "https://www.youtube.com/embed/VIDEO_ID_1",
        description: "✨ A lovely moment"
    },
    {
        title: "Special Memory",
        url: "https://www.youtube.com/embed/VIDEO_ID_2",
        description: "💖 Remember this?"
    }
    // Add more videos here
];

const confettiColors = ['#ff69b4', '#87ceeb', '#ffd1dc', '#e0f4ff', '#ffb6c1'];

const clickSound = document.getElementById('click-sound');
const saveSound = document.getElementById('save-sound');
const videoContainer = document.getElementById('video-container');
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

function generateVideo() {
    clickSound.play();
    createConfetti();
    const randomIndex = Math.floor(Math.random() * videos.length);
    const video = videos[randomIndex];
    
    videoContainer.innerHTML = `
        <div class="video-wrapper">
            <iframe 
                width="100%" 
                height="315" 
                src="${video.url}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        </div>
    `;
    
    videoContainer.classList.add('bounce');
    setTimeout(() => videoContainer.classList.remove('bounce'), 1000);
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'floating-heart');
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

function saveVideo(event) {
    const currentVideo = videos.find(v => v.url === videoContainer.querySelector('iframe').src);
    if (currentVideo && !favorites.some(f => f.url === currentVideo.url)) {
        saveSound.play();
        favorites.push(currentVideo);
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
    favorites.forEach((video, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="video-favorite">
                <iframe 
                    width="200" 
                    height="150" 
                    src="${video.url}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.description}</p>
                </div>
                <div class="button-group">
                    <button class="delete-btn" onclick="deleteVideo(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        favoritesList.appendChild(li);
    });
}

function deleteVideo(index) {
    clickSound.play();
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
}

generateBtn.addEventListener('click', generateVideo);
saveBtn.addEventListener('click', saveVideo);

// Initial favorites list update
updateFavoritesList(); 