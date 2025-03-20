
document.getElementById('current-year').textContent = new Date().getFullYear();


const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showSlide(index) {
    
    galleryItems.forEach(item => {
        item.classList.remove('active');
    });
    
  
    galleryItems[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showSlide(currentIndex);
});


function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.style.display = 'block';
    confettiContainer.innerHTML = '';
    
    const colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#ffccd5'];
    
    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position, color, size, and animation duration
        const left = Math.random() * 100;
        const width = Math.random() * 10 + 5;
        const height = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const animationDuration = Math.random() * 3 + 2;
        
        confetti.style.left = `${left}%`;
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
        confetti.style.backgroundColor = color;
        confetti.style.top = '-5%';
        confetti.style.position = 'absolute';
        confetti.style.animation = `fall ${animationDuration}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.innerHTML = `
            @keyframes fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove confetti after animation completes
    setTimeout(() => {
        confettiContainer.style.display = 'none';
    }, 5000);
}


document.getElementById('celebrate-btn').addEventListener('click', createConfetti);
document.getElementById('love-btn').addEventListener('click', createConfetti);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


const timelineItems = document.querySelectorAll('.timeline-item');

function checkScroll() {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}




timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});


window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);


// Video playlist functionality
const videoItems = document.querySelectorAll('.video-item');
const mainVideo = document.getElementById('main-video');

videoItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        videoItems.forEach(videoItem => {
            videoItem.classList.remove('active');
        });
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Update video source
        const videoSrc = item.getAttribute('data-src');
        mainVideo.src = videoSrc;
        
        // Load and play the video
        mainVideo.load();
        mainVideo.play();
    });
});
