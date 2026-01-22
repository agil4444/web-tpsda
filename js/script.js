document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Inisialisasi AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    // --- 2. FUNGSI GALERI VIDEO ---
    const mainPlayer = document.getElementById('main-video-player');
    const playlistItems = document.querySelectorAll('.video-playlist .card');
    
    const mainVideoTitle = document.getElementById('main-video-title');
    const mainVideoDate = document.getElementById('main-video-date');
    const mainVideoDesc = document.getElementById('main-video-desc');

    // Cek jika player ada
    if (mainPlayer && playlistItems.length > 0) {
        // Cari pembungkus rasio (div class="ratio ...")
        const ratioContainer = mainPlayer.closest('.ratio');

        playlistItems.forEach(item => {
            item.addEventListener('click', function() {
                // A. Reset Active Class
                playlistItems.forEach(card => card.classList.remove('active'));
                this.classList.add('active');

                // B. Ambil Data
                const videoId = this.getAttribute('data-video-id');
                const newTitle = this.getAttribute('data-title');
                const newDate = this.getAttribute('data-date');
                const newDesc = this.getAttribute('data-desc');
                const source = this.getAttribute('data-source');

                // C. Update Teks
                if (mainVideoTitle) mainVideoTitle.textContent = newTitle;
                if (mainVideoDate) mainVideoDate.textContent = newDate;
                if (mainVideoDesc) mainVideoDesc.textContent = newDesc;

                // D. LOGIKA GANTI SUMBER & UKURAN
                if (source === 'instagram') {
                    // 1. Ubah Rasio Jadi Tinggi (Kotak/Portrait)
                    ratioContainer.classList.remove('ratio-16x9'); // Hapus mode lebar
                    
                    // Trik CSS: Ubah rasio jadi lebih tinggi (misal 120%)
                    // Ini membuat kotak jadi persegi panjang ke atas agar muat video IG
                    ratioContainer.style.setProperty('--bs-aspect-ratio', '120%'); 

                    // 2. Masukkan Link Instagram Embed
                    mainPlayer.setAttribute('src', `https://www.instagram.com/p/${videoId}/embed/captioned/`);

                } else {
                    // 1. Balikkan Rasio Jadi Lebar (YouTube Mode)
                    ratioContainer.style.removeProperty('--bs-aspect-ratio'); // Hapus custom tinggi
                    ratioContainer.classList.add('ratio-16x9'); // Kembalikan mode lebar

                    // 2. Masukkan Link YouTube
                    mainPlayer.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
                }
            });
        });
    }
});