const api = (path, options = {}) =>
    fetch(`/admin${path}`, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } });

async function loadUsers() {
    const list = document.getElementById('usersList');
    try {
        const res = await api('/users');
        if (res.redirected) {
            window.location.href = res.url;
            return;
        }
        if (!res.ok) {
            list.innerHTML = '<tr><td colspan="4" class="empty-state">Failed to load users</td></tr>';
            return;
        }
        const users = await res.json();
    list.innerHTML = users.map(u =>
        `<tr class="data-row"><td>${u.id}</td><td>${u.username}</td><td>${u.email}</td><td><span class="badge ${u.isadmin ? 'badge-admin' : 'badge-user'}">${u.isadmin ? 'Admin' : 'User'}</span></td></tr>`
    ).join('');
    if (typeof updateStats === 'function') updateStats();
    } catch (err) {
        console.error(err);
        list.innerHTML = '<tr><td colspan="4" class="empty-state">Failed to load users</td></tr>';
    }
}

async function loadMusic() {
    const list = document.getElementById('musicList');
    try {
        const res = await api('/music');
        if (res.redirected) {
            window.location.href = res.url;
            return;
        }
        if (!res.ok) {
            list.innerHTML = '<tr><td colspan="6" class="empty-state">Failed to load music</td></tr>';
            return;
        }
        const music = await res.json();
    list.innerHTML = music.length
        ? music.map(m =>
            `<tr class="data-row">
                <td>${m.title}</td><td>${m.artist}</td><td>${m.album || '-'}</td><td>${m.genre || '-'}</td><td class="likes">${m.likes || 0}</td>
                <td><button class="delete-btn" onclick="deleteMusic(${m.id})">Delete</button></td>
            </tr>`
        ).join('')
        : '<tr><td colspan="6" class="empty-state">No music</td></tr>';
        if (typeof updateStats === 'function') updateStats();
    } catch (err) {
        console.error(err);
        list.innerHTML = '<tr><td colspan="6" class="empty-state">Failed to load music</td></tr>';
    }
}

async function addMusic(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    const payload = { ...data, duration: data.duration ? parseInt(data.duration, 10) : null };
    const res = await api('/music', { method: 'POST', body: JSON.stringify(payload) });
    if (res.ok) {
        e.target.reset();
        loadMusic();
    } else {
        alert('Failed to add music');
    }
}

async function deleteMusic(id) {
    if (!confirm('Delete this song?')) return;
    await api(`/music/${id}`, { method: 'DELETE' });
    loadMusic();
}

document.addEventListener('DOMContentLoaded', () => {
    window.deleteMusic = deleteMusic;
    loadUsers();
    loadMusic();
    document.getElementById('addMusicForm')?.addEventListener('submit', addMusic);
});
