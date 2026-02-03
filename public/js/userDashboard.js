const api = (path, options = {}) =>
    fetch(`/user${path}`, { ...options, credentials: 'include' });

async function loadMusic(query = '') {
    const list = document.getElementById('musicList');
    try {
        const url = query ? `/music/search?q=${encodeURIComponent(query)}` : '/music';
        const res = await api(url);
        if (res.redirected) {
            window.location.href = res.url;
            return;
        }
        if (!res.ok) {
            list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><p class="empty-state-text">Failed to load music</p></div>';
            return;
        }
        const music = await res.json();
        list.innerHTML = music.length
            ? music.map(m =>
                `<div class="music-item">
                    <div class="album-cover">
                        ${m.cover_image ? `<img src="${m.cover_image}" alt="${m.title}">` : '🎵'}
                        <button class="play-button" title="Play">
                            <span class="play-icon"></span>
                        </button>
                    </div>
                    <div class="music-info">
                        <div class="music-title">${escapeHtml(m.title)}</div>
                        <div class="music-artist">${escapeHtml(m.artist)}</div>
                    </div>
                    <div class="music-meta">
                        <span class="genre">${escapeHtml(m.genre || '')}</span>
                        <button class="like-button" onclick="event.stopPropagation(); likeMusic(${m.id})">
                            ♥ <span class="like-count">${m.likes || 0}</span>
                        </button>
                    </div>
                </div>`
            ).join('')
            : '<div class="empty-state"><div class="empty-state-icon">🎵</div><p class="empty-state-text">No music found</p><p class="empty-state-subtext">Try a different search</p></div>';
    } catch (err) {
        console.error(err);
        list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><p class="empty-state-text">Failed to load music</p></div>';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function likeMusic(id) {
    try {
        const res = await api(`/music/${id}/like`, { method: 'POST' });
        if (res.redirected) {
            window.location.href = res.url;
            return;
        }
        loadMusic(document.getElementById('searchInput')?.value || '');
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.likeMusic = likeMusic;
    loadMusic();
    document.getElementById('searchInput')?.addEventListener('input', (e) => loadMusic(e.target.value));
    document.getElementById('searchBtn')?.addEventListener('click', () =>
        loadMusic(document.getElementById('searchInput')?.value || '')
    );
});
