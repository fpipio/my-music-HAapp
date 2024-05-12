// modules/utilities.js

// Funzione per formattare la durata in ore, minuti e secondi
export function formatDuration(duration) {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    let formattedDuration = '';

    // Se ci sono ore, le aggiungiamo al formato
    if (hours > 0) {
        formattedDuration += `${hours}:`;
    }

    // Aggiungiamo i minuti al formato (anche se le ore sono 0)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    formattedDuration += `${formattedMinutes}:`;

    // Aggiungiamo i secondi al formato
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    formattedDuration += formattedSeconds;

    return formattedDuration;
}


export async function playOnSonos(hass, config, machineIdentifier, trackId) {
    console.log("wow");
    try {
        await hass.callService('media_player', 'play_media', {
            entity_id: hass.states[config.activePlayer].state,
            media_content_type: 'music',
            media_content_id: `plex://${machineIdentifier}/${trackId}`
        });
    } catch (error) {
        console.error(`Error playing track:`, error);
    }
}