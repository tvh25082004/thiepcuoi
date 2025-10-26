// Hiệu ứng trái tim với Canvas
class HeartEffect {
    constructor() {
        this.canvas = document.getElementById('heartCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.hearts = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createHeart();
        this.animate();
        
        // Tạo trái tim mới mỗi 2000ms (chậm hơn cho thiệp cưới)
        setInterval(() => {
            this.createHeart();
        }, 2000);
        
        // Resize canvas khi thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createHeart() {
        const heart = {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 50,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 2 + 1,
            rotation: 0,
            rotationSpeed: Math.random() * 0.05 + 0.02,
            opacity: 1,
            color: this.getRandomHeartColor()
        };
        
        this.hearts.push(heart);
    }
    
    getRandomHeartColor() {
        const colors = [
            '#d4af37', '#f4d03f', '#ffd700', '#ff6b6b', '#ff8e8e', 
            '#ffa8a8', '#ffb3ba', '#ff9ff3', '#f368e0', '#ff6348', 
            '#ff4757', '#ffd93d', '#ff9a9e', '#fecfef', '#a8e6cf',
            '#ffb3ba', '#ffc0cb', '#ffb6c1', '#ffa0d6', '#ff69b4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    drawHeart(heart) {
        this.ctx.save();
        this.ctx.translate(heart.x, heart.y);
        this.ctx.rotate(heart.rotation);
        this.ctx.scale(heart.size / 20, heart.size / 20);
        
        this.ctx.fillStyle = heart.color;
        this.ctx.globalAlpha = heart.opacity;
        
        // Vẽ trái tim
        this.ctx.beginPath();
        this.ctx.moveTo(0, 5);
        this.ctx.bezierCurveTo(-5, -5, -15, -5, -15, 5);
        this.ctx.bezierCurveTo(-15, 15, 0, 25, 0, 25);
        this.ctx.bezierCurveTo(0, 25, 15, 15, 15, 5);
        this.ctx.bezierCurveTo(15, -5, 5, -5, 0, 5);
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    updateHeart(heart) {
        heart.y -= heart.speed;
        heart.rotation += heart.rotationSpeed;
        heart.opacity -= 0.005;
        
        // Thêm hiệu ứng nhấp nháy nhẹ
        if (Math.random() < 0.05) {
            heart.opacity = Math.random() * 0.3 + 0.7;
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.hearts.length - 1; i >= 0; i--) {
            const heart = this.hearts[i];
            
            this.updateHeart(heart);
            this.drawHeart(heart);
            
            // Xóa trái tim khi nó ra khỏi màn hình hoặc mờ đi
            if (heart.y < -50 || heart.opacity <= 0) {
                this.hearts.splice(i, 1);
            }
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Hiệu ứng tương tác với chuột
class MouseHeartEffect {
    constructor() {
        this.setupMouseEffect();
    }
    
    setupMouseEffect() {
        document.addEventListener('click', (e) => {
            this.createClickHeart(e.clientX, e.clientY);
        });
    }
    
    createClickHeart(x, y) {
        const heartEmojis = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🤎'];
        const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        const heart = document.createElement('div');
        heart.innerHTML = randomEmoji;
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'heartClick 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
}

// Scroll Animations cho thiệp cưới
class WeddingScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Quan sát các phần tử cần animation
        const elementsToAnimate = document.querySelectorAll('.ceremony-info, .family-info, .wedding-ceremony, .photo-album, .location-section, .calendar-section, .thank-you');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.couple-photo, .ceremony-info, .family-info');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Hiệu ứng cho ảnh album
class PhotoAlbumEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupPhotoHover();
        this.setupPhotoClick();
        this.setupStaggeredAnimation();
        this.setupAdditionalPhotos();
    }
    
    setupPhotoHover() {
        const photoItems = document.querySelectorAll('.photo-item, .additional-photo-item');
        
        photoItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.createSparkleEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeSparkleEffect(item);
            });
        });
    }
    
    setupPhotoClick() {
        const photoItems = document.querySelectorAll('.photo-item, .additional-photo-item');
        
        photoItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showPhotoModal(item.querySelector('img').src);
                this.createHeartBurst(item);
            });
        });
    }
    
    setupStaggeredAnimation() {
        const photoItems = document.querySelectorAll('.photo-item');
        
        photoItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('staggered-fade-in');
        });
    }
    
    setupAdditionalPhotos() {
        const additionalItems = document.querySelectorAll('.additional-photo-item');
        
        additionalItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.3}s`;
            item.classList.add('staggered-slide-up');
        });
    }
    
    createSparkleEffect(element) {
        const sparkles = ['✨', '💫', '⭐', '🌟'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.fontSize = '1.5rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
                
                element.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2000);
            }, i * 200);
        }
    }
    
    removeSparkleEffect(element) {
        const sparkles = element.querySelectorAll('[style*="sparkleFloat"]');
        sparkles.forEach(sparkle => sparkle.remove());
    }
    
    createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const hearts = ['💕', '💖', '💗', '💘', '💝', '💞', '💟'];
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            heart.style.animation = `heartBurst 1.5s ease-out forwards`;
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            heart.style.setProperty('--endX', endX + 'px');
            heart.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }
    }
    
    showPhotoModal(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imageSrc}" alt="Ảnh cưới">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Hiệu ứng fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Đóng modal khi click
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }
}

// Hiệu ứng cho lịch
class CalendarEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCalendarHover();
        this.setupWeddingDayEffect();
    }
    
    setupCalendarHover() {
        const calendarDays = document.querySelectorAll('.calendar-day');
        
        calendarDays.forEach(day => {
            if (day.textContent && day.textContent.trim() !== '') {
                day.addEventListener('mouseenter', () => {
                    day.style.background = '#f0f0f0';
                    day.style.transform = 'scale(1.1)';
                });
                
                day.addEventListener('mouseleave', () => {
                    if (!day.classList.contains('wedding-day')) {
                        day.style.background = '';
                        day.style.transform = 'scale(1)';
                    }
                });
            }
        });
    }
    
    setupWeddingDayEffect() {
        const weddingDay = document.querySelector('.wedding-day');
        if (weddingDay) {
            setInterval(() => {
                weddingDay.style.background = weddingDay.style.background === 'rgb(212, 175, 55)' ? '#ff6b6b' : '#d4af37';
            }, 1000);
        }
    }
}

// Hiệu ứng cho Google Maps
class MapEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupMapInteraction();
    }
    
    setupMapInteraction() {
        const directionsBtn = document.querySelector('.directions-btn');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                // Mở Google Maps với chỉ đường
                const address = "RR24+G92 Thanh Hóa";
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
                window.open(googleMapsUrl, '_blank');
            });
        }
        
        const viewLarger = document.querySelector('.view-larger');
        if (viewLarger) {
            viewLarger.addEventListener('click', (e) => {
                e.preventDefault();
                const address = "RR24+G92 Thanh Hóa";
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                window.open(googleMapsUrl, '_blank');
            });
        }
    }
}

// Hiệu ứng typing cho tên cặp đôi
class TypingEffect {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypingEffect();
    }
    
    setupTypingEffect() {
        const groomName = document.querySelector('.groom-name');
        const brideName = document.querySelector('.bride-name');
        
        if (groomName && brideName) {
            const groomText = groomName.textContent;
            const brideText = brideName.textContent;
            
            groomName.textContent = '';
            brideName.textContent = '';
            
            this.typeText(groomName, groomText, 100);
            setTimeout(() => {
                this.typeText(brideName, brideText, 100);
            }, 1000);
        }
    }
    
    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// CSS cho hiệu ứng
const style = document.createElement('style');
style.textContent = `
    @keyframes heartClick {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .photo-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: modalZoomIn 0.3s ease-out;
    }
    
    @keyframes modalZoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .modal-content img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 15px;
        box-shadow: 0 20px 50px rgba(212, 175, 55, 0.3);
    }
    
    .close-modal {
        position: absolute;
        top: -50px;
        right: 0;
        color: white;
        font-size: 2.5rem;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
    }
    
    .close-modal:hover {
        color: #d4af37;
        transform: scale(1.2);
    }
    
    .staggered-fade-in {
        opacity: 0;
        transform: translateY(30px);
        animation: staggeredFadeIn 0.8s ease-out forwards;
    }
    
    @keyframes staggeredFadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .staggered-slide-up {
        opacity: 0;
        transform: translateY(50px);
        animation: staggeredSlideUp 1s ease-out forwards;
    }
    
    @keyframes staggeredSlideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
    
    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--endX), var(--endY)) scale(0.5);
        }
    }
    
    .calendar-day {
        transition: all 0.3s ease;
    }
    
    .wedding-day {
        animation: weddingPulse 2s infinite;
    }
    
    @keyframes weddingPulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
        }
    }
`;
document.head.appendChild(style);

// Auto Music Player - Tự động phát nhạc nền
class AutoMusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.init();
    }
    
    init() {
        if (this.audio) {
            // Thiết lập âm lượng
            this.audio.volume = 0.6; // Âm lượng 60%
            
            // Tự động phát nhạc ngay lập tức
            this.audio.play().catch(e => {
                console.log('Không thể tự động phát nhạc:', e);
            });
            
            // Thử phát lại nhiều lần
            setTimeout(() => {
                if (this.audio.paused) {
                    this.audio.play().catch(e => {
                        console.log('Thử phát lần 2:', e);
                    });
                }
            }, 1000);
            
            setTimeout(() => {
                if (this.audio.paused) {
                    this.audio.play().catch(e => {
                        console.log('Thử phát lần 3:', e);
                    });
                }
            }, 3000);
            
            setTimeout(() => {
                if (this.audio.paused) {
                    this.audio.play().catch(e => {
                        console.log('Thử phát lần 4:', e);
                    });
                }
            }, 5000);
            
            // Setup fallback cho user interaction
            this.setupUserInteractionPlay();
        }
    }
    
    setupUserInteractionPlay() {
        // Phát nhạc khi user tương tác với trang
        const playOnInteraction = () => {
            if (this.audio.paused) {
                this.audio.play().catch(e => {
                    console.log('Vẫn không thể phát nhạc:', e);
                });
            }
        };
        
        // Thêm nhiều event listener để đảm bảo phát nhạc
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('scroll', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
        document.addEventListener('mousemove', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    }
}

// Function để phát nhạc thủ công
function playMusic() {
    const audio = document.getElementById('backgroundMusic');
    const btn = document.getElementById('playMusicBtn');
    
    if (audio) {
        audio.play().then(() => {
            console.log('Nhạc đã phát thành công!');
            // Thay đổi text và ẩn button sau 3 giây
            if (btn) {
                btn.innerHTML = '🎵 Đang Phát...';
                btn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                setTimeout(() => {
                    btn.style.display = 'none';
                }, 3000);
            }
        }).catch(e => {
            console.log('Không thể phát nhạc:', e);
            if (btn) {
                btn.innerHTML = '❌ Lỗi Phát Nhạc';
                btn.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
            }
            alert('Không thể phát nhạc. Vui lòng kiểm tra trình duyệt có hỗ trợ audio không.');
        });
    }
}

// Hiệu ứng chim bay và động vật
class BirdAnimationEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.createFlyingBirds();
        this.createFloatingHearts();
        this.createSparkleEffects();
    }
    
    createFlyingBirds() {
        // Tạo thêm chim bay ngẫu nhiên
        setInterval(() => {
            this.spawnRandomBird();
        }, 3000);
    }
    
    spawnRandomBird() {
        const birds = ['🐦', '🕊️', '🦅', '🦜', '🐤'];
        const bird = document.createElement('div');
        bird.innerHTML = birds[Math.floor(Math.random() * birds.length)];
        bird.style.position = 'fixed';
        bird.style.fontSize = '2rem';
        bird.style.zIndex = '1000';
        bird.style.pointerEvents = 'none';
        bird.style.left = '-100px';
        bird.style.top = Math.random() * window.innerHeight + 'px';
        bird.style.animation = `flyAcross ${8 + Math.random() * 4}s linear forwards`;
        
        document.body.appendChild(bird);
        
        // Xóa chim sau khi bay xong
        setTimeout(() => {
            if (bird.parentNode) {
                bird.parentNode.removeChild(bird);
            }
        }, 12000);
    }
    
    createFloatingHearts() {
        // Tạo trái tim bay lơ lửng
        setInterval(() => {
            this.spawnFloatingHeart();
        }, 2000);
    }
    
    spawnFloatingHeart() {
        const hearts = ['💖', '💕', '💗', '💝', '💘'];
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '999';
        heart.style.pointerEvents = 'none';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.animation = `floatUp ${6 + Math.random() * 3}s ease-out forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 9000);
    }
    
    createSparkleEffects() {
        // Tạo hiệu ứng lấp lánh
        setInterval(() => {
            this.spawnSparkle();
        }, 1500);
    }
    
    spawnSparkle() {
        const sparkles = ['✨', '⭐', '🌟', '💫', '✨'];
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = '1rem';
        sparkle.style.zIndex = '1001';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.animation = `sparkleFloat ${3 + Math.random() * 2}s ease-in-out forwards`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 5000);
    }
}

// Hiệu ứng đặc biệt cho lễ cưới
class CeremonySpecialEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.addCeremonyGlow();
        this.addTextPulseEffect();
        this.addDateHighlightEffect();
    }
    
    addCeremonyGlow() {
        const ceremonySections = document.querySelectorAll('.wedding-ceremony');
        ceremonySections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
                section.style.transform = 'scale(1.02)';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.boxShadow = '';
                section.style.transform = '';
            });
        });
    }
    
    addTextPulseEffect() {
        const ceremonyTitles = document.querySelectorAll('.ceremony-title-special');
        ceremonyTitles.forEach(title => {
            setInterval(() => {
                title.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    title.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        });
    }
    
    addDateHighlightEffect() {
        const dateElements = document.querySelectorAll('.day-number, .time');
        dateElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.color = '#d4af37';
                element.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8)';
                element.style.transform = 'scale(1.1)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.color = '';
                element.style.textShadow = '';
                element.style.transform = '';
            });
        });
    }
}

// Modal thiệp mừng cưới
function showInvitationModal() {
    const modal = document.getElementById('invitationModal');
    modal.style.display = 'block';
    
    // Hiệu ứng fade in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Đóng modal khi click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeInvitationModal();
        }
    });
    
    // Đóng modal khi click close button
    document.querySelector('.close-invitation-modal').addEventListener('click', closeInvitationModal);
}

function closeInvitationModal() {
    const modal = document.getElementById('invitationModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function shareInvitation() {
    if (navigator.share) {
        navigator.share({
            title: 'Thiệp Mừng Cưới - Mạnh Hùng & Anh Thư',
            text: 'Chúc mừng cưới Mạnh Hùng & Anh Thư!',
            url: window.location.href
        });
    } else {
        // Fallback cho trình duyệt không hỗ trợ Web Share API
        const shareText = 'Chúc mừng cưới Mạnh Hùng & Anh Thư! Xem thiệp cưới tại: ' + window.location.href;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Đã copy link chia sẻ vào clipboard!');
        });
    }
}

function downloadInvitation() {
    // Tạo canvas để vẽ thiệp mừng cưới
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 1000;
    
    // Vẽ background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#fefefe');
    gradient.addColorStop(1, '#f8f6f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ tiêu đề
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Thiệp Mừng Cưới', canvas.width / 2, 100);
    
    // Vẽ tên cặp đôi
    ctx.fillStyle = '#333';
    ctx.font = 'bold 36px serif';
    ctx.fillText('Mạnh Hùng & Anh Thư', canvas.width / 2, 180);
    
    // Vẽ QR codes (placeholder)
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(150, 250, 150, 150);
    ctx.fillRect(500, 250, 150, 150);
    
    // Vẽ text QR code
    ctx.fillStyle = '#666';
    ctx.font = '16px sans-serif';
    ctx.fillText('QR Code 1', 225, 420);
    ctx.fillText('QR Code 2', 575, 420);
    
    // Vẽ lời chúc
    ctx.fillStyle = '#333';
    ctx.font = '24px serif';
    ctx.fillText('Chúc hai bạn trăm năm hạnh phúc!', canvas.width / 2, 500);
    ctx.fillText('Mong rằng tình yêu của hai bạn sẽ mãi mãi bền vững.', canvas.width / 2, 540);
    
    // Tải xuống
    const link = document.createElement('a');
    link.download = 'thiep-mung-cuoi.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Modal thiệp mừng nhà trai
function showNhaTraiModal() {
    const modal = document.getElementById('nhaTraiModal');
    
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '99999';
        
        // Hiệu ứng fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Đóng modal khi click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeNhaTraiModal();
            }
        });
    }
}

function closeNhaTraiModal() {
    const modal = document.getElementById('nhaTraiModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Modal thiệp mừng nhà gái
function showNhaGaiModal() {
    const modal = document.getElementById('nhaGaiModal');
    
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '99999';
        
        // Hiệu ứng fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Đóng modal khi click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeNhaGaiModal();
            }
        });
    }
}

function closeNhaGaiModal() {
    const modal = document.getElementById('nhaGaiModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Share và download cho nhà trai
function shareNhaTraiInvitation() {
    if (navigator.share) {
        navigator.share({
            title: 'Thiệp Mừng Nhà Trai - Mạnh Hùng & Anh Thư',
            text: 'Chúc mừng cưới Mạnh Hùng & Anh Thư!',
            url: window.location.href
        });
    } else {
        const shareText = 'Chúc mừng cưới Mạnh Hùng & Anh Thư! Xem thiệp cưới nhà trai tại: ' + window.location.href;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Đã copy link chia sẻ vào clipboard!');
        });
    }
}

function downloadNhaTraiInvitation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 1000;
    
    // Vẽ background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ tiêu đề
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Thiệp Mừng Nhà Trai', canvas.width / 2, 100);
    
    // Vẽ tên cặp đôi
    ctx.fillStyle = '#333';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('Mạnh Hùng & Anh Thư', canvas.width / 2, 150);
    
    // Vẽ QR code placeholder
    ctx.fillStyle = '#ddd';
    ctx.fillRect(canvas.width / 2 - 75, 200, 150, 150);
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.fillText('QR Code Nhà Trai', canvas.width / 2, 280);
    
    // Vẽ lời chúc
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('Chúc hai bạn trăm năm hạnh phúc!', canvas.width / 2, 400);
    ctx.fillText('Mong rằng tình yêu của hai bạn sẽ mãi mãi bền vững.', canvas.width / 2, 430);
    
    // Tải xuống
    const link = document.createElement('a');
    link.download = 'thiep-mung-nha-trai.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Share và download cho nhà gái
function shareNhaGaiInvitation() {
    if (navigator.share) {
        navigator.share({
            title: 'Thiệp Mừng Nhà Gái - Mạnh Hùng & Anh Thư',
            text: 'Chúc mừng cưới Mạnh Hùng & Anh Thư!',
            url: window.location.href
        });
    } else {
        const shareText = 'Chúc mừng cưới Mạnh Hùng & Anh Thư! Xem thiệp cưới nhà gái tại: ' + window.location.href;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Đã copy link chia sẻ vào clipboard!');
        });
    }
}

function downloadNhaGaiInvitation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 1000;
    
    // Vẽ background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ tiêu đề
    ctx.fillStyle = '#E91E63';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Thiệp Mừng Nhà Gái', canvas.width / 2, 100);
    
    // Vẽ tên cặp đôi
    ctx.fillStyle = '#333';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('Mạnh Hùng & Anh Thư', canvas.width / 2, 150);
    
    // Vẽ QR code placeholder
    ctx.fillStyle = '#ddd';
    ctx.fillRect(canvas.width / 2 - 75, 200, 150, 150);
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.fillText('QR Code Nhà Gái', canvas.width / 2, 280);
    
    // Vẽ lời chúc
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('Chúc hai bạn trăm năm hạnh phúc!', canvas.width / 2, 400);
    ctx.fillText('Mong rằng tình yêu của hai bạn sẽ mãi mãi bền vững.', canvas.width / 2, 430);
    
    // Tải xuống
    const link = document.createElement('a');
    link.download = 'thiep-mung-nha-gai.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Khởi tạo tất cả hiệu ứng khi trang web load xong
document.addEventListener('DOMContentLoaded', () => {
    
    
    // Khởi tạo auto music player
    new AutoMusicPlayer();
    
    // Khởi tạo hiệu ứng Canvas
    new HeartEffect();
    
    // Khởi tạo hiệu ứng chuột
    new MouseHeartEffect();
    
    // Khởi tạo scroll animations
    new WeddingScrollAnimations();
    
    // Khởi tạo hiệu ứng album ảnh
    new PhotoAlbumEffects();
    
    // Khởi tạo hiệu ứng lịch
    new CalendarEffects();
    
    // Khởi tạo hiệu ứng bản đồ
    new MapEffects();
    
    // Khởi tạo hiệu ứng chim bay và động vật
    new BirdAnimationEffects();
    
    // Khởi tạo hiệu ứng đặc biệt cho lễ cưới
    new CeremonySpecialEffects();
    
    // Khởi tạo hiệu ứng typing
    new TypingEffect();
    
    // Hiệu ứng loading trang
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 200);
    });
    
    // Hiệu ứng cho các phần tử đặc biệt
    const welcomeText = document.querySelector('.welcome');
    if (welcomeText) {
        setTimeout(() => {
            welcomeText.style.animation = 'fadeInUp 1s ease forwards';
        }, 500);
    }
    
    // Hiệu ứng cho ngày cưới
    const weddingDate = document.querySelector('.wedding-date');
    if (weddingDate) {
        setInterval(() => {
            weddingDate.style.color = weddingDate.style.color === 'rgb(51, 51, 51)' ? '#d4af37' : '#333';
        }, 2000);
    }
    
    // Hiệu ứng cho tên cặp đôi
    const coupleNames = document.querySelectorAll('.groom-name, .bride-name');
    coupleNames.forEach((name, index) => {
        setTimeout(() => {
            name.style.animation = 'fadeInUp 1s ease forwards';
        }, 1000 + (index * 500));
    });
});

// Thêm hiệu ứng particle background nhẹ nhàng
class WeddingParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 0.8 - 0.4,
                speedY: Math.random() * 0.8 - 0.4,
                opacity: Math.random() * 0.4 + 0.1,
                color: this.getRandomParticleColor()
            });
        }
    }
    
    getRandomParticleColor() {
        const colors = [
            'rgba(212, 175, 55, 0.3)',
            'rgba(244, 208, 63, 0.3)',
            'rgba(255, 215, 0, 0.3)',
            'rgba(255, 107, 107, 0.2)',
            'rgba(255, 182, 193, 0.2)',
            'rgba(255, 192, 203, 0.2)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}


// Khởi tạo particle background
new WeddingParticleBackground();