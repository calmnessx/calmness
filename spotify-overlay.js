async function fetchCurrentlyPlaying() {
    const accessToken = 'ваш_токен_доступа';  // Укажите свой токен доступа
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        displayTrackInfo(data);
    } else {
        console.log('Не удалось получить информацию о текущей песне');
    }
}

function displayTrackInfo(track) {
    const overlay = document.getElementById('spotify-overlay');
    overlay.innerHTML = `
        <div>
            <p>Сейчас играет: ${track.item.name}</p>
            <p>Исполнитель: ${track.item.artists.map(artist => artist.name).join(', ')}</p>
            <img src="${track.item.album.images[0].url}" alt="Обложка альбома" />
        </div>
    `;
    overlay.style.display = 'block';  // Показываем оверлей
}

// Запускаем обновление трека каждые 30 секунд
setInterval(fetchCurrentlyPlaying, 30000);
fetchCurrentlyPlaying();
