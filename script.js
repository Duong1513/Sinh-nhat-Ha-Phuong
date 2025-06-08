document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('open-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const body = document.querySelector('body');

    // Mở quà
    openButton.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.visibility = 'hidden';
            body.style.overflowY = 'auto';
            mainContent.style.display = 'block';
            launchConfetti();
            startTyping();
        }, 1500); // Đợi hiệu ứng mờ hoàn tất
    });

    // Bắn pháo giấy
    function launchConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // Hiệu ứng gõ chữ
    const mainTitle = document.getElementById('main-title');
    // 💖 BƯỚC 6: THAY ĐỔI TIÊU ĐỀ CHÍNH Ở ĐÂY
    const textToType = "Chúc Mừng Sinh Nhật, Công Chúa Của Anh!";
    let index = 0;

    function startTyping() {
        if (index < textToType.length) {
            mainTitle.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(startTyping, 120); // Tốc độ gõ chữ
        }
    }

    // Nhạc
    const musicButton = document.getElementById('music-button');
    const audio = document.getElementById('background-music');
    audio.volume = 0.5; // Chỉnh âm lượng
    let isPlaying = false;

    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicButton.textContent = 'Bật Giai Điệu Của Chúng Ta 🎵';
        } else {
            audio.play();
            musicButton.textContent = 'Tắt Nhạc ⏸️';
        }
        isPlaying = !isPlaying;
    });

    // Modal ảnh
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    document.querySelectorAll(".photo-gallery img").forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.dataset.fullSrc;
        }
    });

    document.querySelector(".close").onclick = () => modal.style.display = "none";
    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Hiệu ứng xuất hiện khi cuộn
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // Xóa class nếu muốn hiệu ứng lặp lại khi cuộn lên xuống
                // entry.target.classList.remove('show'); 
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});