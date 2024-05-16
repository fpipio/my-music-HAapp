const styles = `

.value {
    padding-left: 0.5em;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
}


form {
    display: table;
}
.row {
    display: table-row;
}
.label, .value {
    display: table-cell;
    padding: 0.5em;
}

.media-type{
    margin-bottom: 20px;

}

.artist-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    gap: 10px;
}

.artist-item {
    border: 1px solid #ccc;
    text-align: left;
    white-space: nowrap;
}

.artist-detail-header{
    display: flex;
    margin-bottom: 20px;
}

.artist-detail-header-info{
    margin-left: 20px;
}

.album-detail-header{
    display: flex;
    margin-bottom: 20px;
}

.album-detail-header-info{
    margin-left: 20px;
}

.artist-name {
    overflow: hidden;
    text-overflow: ellipsis; /* Aggiunge i tre puntini se il testo eccede la larghezza del contenitore */
    color: var(--primary-text-color);
}

.artist-image {
    max-width: 145px;
    max-height: 145px;
    object-fit: cover;
    aspect-ratio: 1 / 1;
}

.search-input {
    width: 100%; /* Imposta la larghezza al 100% del contenitore genitore */
    padding: 8px; /* Aggiungi spazio intorno al testo all'interno dell'input */
    border: 1px solid #ccc; /* Aggiungi un bordo sottile */
    border-radius: 4px; /* Aggiungi angoli arrotondati */
    box-sizing: border-box; /* Garantisce che il padding e il bordo siano inclusi nella larghezza totale */
    margin-bottom: 5px;
}

/* Stile per la griglia degli album */
.album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Griglia con colonne di larghezza minima di 200px */
    grid-gap: 20px; /* Spaziatura tra le celle della griglia */
}

/* Stile per ciascun elemento dell'album nella griglia */
.album-item {
    border: 1px solid #ccc; /* Bordo grigio */
    padding: 10px; /* Spaziatura interna */
}

/* Stile per l'immagine dell'album */
.album-image {
    width: 100%; /* Occupa tutta la larghezza dell'elemento */
    height: auto; /* Altezza automatica */
    object-fit: cover;
    aspect-ratio: 1 / 1;
}

/* Stile per il titolo dell'album */
.album-title {
    font-weight: bold; /* Testo in grassetto */
    margin-top: 5px; /* Margine superiore */
}

/* Stile per l'anno dell'album */
.album-year {
    color: #888; /* Colore grigio scuro */
    font-size: 0.9em; /* Dimensione del carattere leggermente più piccola */
}



.album-detail {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.album-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
}

.album-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.track-container {
    margin-top: 20px;
}

.track-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.track-item:last-child {
    border-bottom: none; /* Rimuove la linea inferiore dall'ultimo elemento */
}

.track-item:hover {
    background-color: #f0f0f0; /* Cambia il colore di sfondo al passaggio del mouse */
}

.track-duration {
    float: right; /* Posiziona la durata della traccia a destra */
    font-size: 14px;
    color: #666;
}

.artist-detail .artist-name {
    margin-bottom: 20px;
    font-weight: bold; 
    font-size: 18px;
}


.track-item {
    display: flex; /* Utilizza il layout flexbox */
    align-items: center; /* Allinea verticalmente al centro */
}

.triangle-icon,
.track-name {
    margin-right: 10px; /* Aggiunge spazio tra gli elementi */
}

.track-duration {
    margin-left: auto; /* Posiziona l'elemento .track-duration a destra */
}


.playlist-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
}

.playlist-item {
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.playlist-item:hover {
    transform: translateY(-5px);
}

.playlist-name {
    font-weight: bold;
}

.tracks-count, .total-duration {
    margin-top: 5px;
    font-size: 0.9em;
    color: #666;
}

/* Stili per l'intestazione della playlist */
.playlist-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.playlist-image {
    width: 100px; /* Imposta la larghezza desiderata */
    height: auto; /* Imposta l'altezza automaticamente in base all'immagine */
    margin-right: 10px;
}

.playlist-title {
    font-size: 20px;
    font-weight: bold;
}

.total-duration {
    margin-left: auto; /* Allinea la durata a destra */
}

/* Stili per le singole tracce */
.track-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.triangle-icon {
    margin-right: 10px;
    cursor: pointer; /* Cambia il cursore al passaggio sopra l'icona */
}

.track-details {
    display: flex;
    flex-direction: column;
}

.track-title {
    font-weight: bold;
}

.author-album {
    font-style: italic; /* Aggiunge stile corsivo all'autore */
}

.track-duration {
    margin-left: auto; /* Allinea la durata a destra */
}


.playlist-type {
    font-size: 14px;
    font-style: italic;
    margin-bottom: 5px;
}

.play-button {
    margin-left: auto;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.play-button:hover {
    background-color: #0056b3;
}

`;

function getMachineIdentifier(plexServerUrl, authToken) {
    return fetch(`${plexServerUrl}/identity`, {
        headers: {
            "X-Plex-Token": authToken,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore durante la richiesta delle sezioni della libreria");
        }
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const machineIdentity = xmlDoc.querySelector("MediaContainer");
        const machineIdentifier = machineIdentity.getAttribute("machineIdentifier");
        return machineIdentifier;

    })
    .catch(error => {
        console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
    });
}


async function getMusicLibraries(plexServerUrl, authToken) {
    try {
        const response = await fetch(`${plexServerUrl}/library/sections`, {
            headers: {
                "X-Plex-Token": authToken,
            },
        });

        if (!response.ok) {
            throw new Error("Errore durante il recupero della lista delle librerie");
        }

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const libraries = xmlDoc.querySelectorAll('Directory[type="artist"]');

        const musicLibraries = [];
        libraries.forEach(library => {
            const libraryName = library.getAttribute("title");
            const libraryId = library.getAttribute("key");
            const libraryData = {
                libraryName: libraryName,
                libraryId: libraryId
            };
            musicLibraries.push(libraryData);
        });

        return musicLibraries;
    } catch (error) {
        console.error("Errore durante il recupero delle librerie musicali:", error);
        throw error;
    }
}



function getMusicLibraryId(plexServerUrl, authToken, activeLibrary) {
    return fetch(`${plexServerUrl}/library/sections`, {
        headers: {
            "X-Plex-Token": authToken,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore durante la richiesta delle sezioni della libreria");
        }
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const musicSection = xmlDoc.querySelector(`Directory[type="artist"][title="${activeLibrary}"]`);
        const musicLibraryId = musicSection.getAttribute("key");

        return musicLibraryId;
        // Etc...
    })
    .catch(error => {
        console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
    });
}

async function getArtistLibrary(musicLibraryId, plexServerUrl, authToken) {
    try {
        const response = await fetch(`${plexServerUrl}/library/sections/${musicLibraryId}/all`, {
            headers: {
                "X-Plex-Token": authToken,
            },
        });

        if (!response.ok) {
            throw new Error("Errore durante la richiesta degli artisti della libreria");
        }

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const artists = xmlDoc.querySelectorAll('Directory[type="artist"]');

        const artistLibrary = [];
        const linkTrascode = "/photo/:/transcode?width=200&height=220&minSize=1&upscale=1&url=";
        artists.forEach(artist => {
            const artistName = artist.getAttribute("title");
            const artistImage = artist.getAttribute("thumb"); // Assume che ci sia un attributo 'thumb' nell'elemento artista che contenga l'URL dell'immagine dell'artista
            const artistKey = artist.getAttribute("ratingKey"); // Assume che ci sia un attributo 'thumb' nell'elemento artista che contenga l'URL dell'immagine dell'artista
            const artistImageUrl = 
            plexServerUrl +
            linkTrascode +
            artistImage +
            "&X-Plex-Token=" +
            authToken;

            const artistData = {
                name: artistName,
                image: artistImageUrl,
                artistKey: artistKey
            };
            artistLibrary.push(artistData);
        });

        return artistLibrary;
    } catch (error) {
        throw new Error("Errore durante il recupero degli artisti della libreria:", error);
    }
}



// Definisci la funzione getArtistAlbums
async function getArtistAlbums(artistKey, plexServerUrl, authToken) {
    try {
        // Effettua la richiesta API per ottenere la lista degli album dell'artista
        // Utilizza fetch o una libreria per effettuare la richiesta HTTP
        const response = await fetch(`${plexServerUrl}/library/metadata/${artistKey}/children`, {
            headers: {
                "X-Plex-Token": authToken,
            },
        });

        // Controlla lo stato della risposta
        if (!response.ok) {
            throw new Error('Errore nella richiesta API');
        }

        // Estrai i dati JSON dalla risposta

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const albums = xmlDoc.querySelectorAll('Directory[type="album"]');




        const albumList = [];
        const linkTrascode = "/photo/:/transcode?width=200&height=220&minSize=1&upscale=1&url=";
        albums.forEach(album => {
            const albumName = album.getAttribute("title");
            const albumImage = album.getAttribute("thumb"); // Assume che ci sia un attributo 'thumb' nell'elemento artista che contenga l'URL dell'immagine dell'artista
            const albumKey = album.getAttribute("ratingKey"); // Assume che ci sia un attributo 'thumb' nell'elemento artista che contenga l'URL dell'immagine dell'artista
            const albumYear = album.getAttribute("year"); // Assume che ci sia un attributo 'thumb' nell'elemento artista che contenga l'URL dell'immagine dell'artista
            const parentTitle = album.getAttribute("parentTitle");
            const albumImageUrl = 
            plexServerUrl +
            linkTrascode +
            albumImage +
            "&X-Plex-Token=" +
            authToken;

            const albumData = {
                name: albumName,
                image: albumImageUrl,
                albumKey: albumKey,
                year: albumYear,
                parentTitle: parentTitle
            };
            albumList.push(albumData);
        });

        return albumList;
        




    } catch (error) {
        // Gestisci gli errori
        console.error('Errore durante il recupero degli album dell\'artista:', error);
        throw error; // Rilancia l'errore per gestirlo nel chiamante
    }
}


// Definisci la funzione getAlbumTracks
async function getAlbumTracks(albumKey, plexServerUrl, authToken) {
    try {
        // Effettua la richiesta API per ottenere la lista delle tracce dell'album
        // Utilizza fetch o una libreria per effettuare la richiesta HTTP
        const response = await fetch(`${plexServerUrl}/library/metadata/${albumKey}/children`, {
            headers: {
                "X-Plex-Token": authToken,
            },
        });
        // Controlla lo stato della risposta
        if (!response.ok) {
            throw new Error('Errore nella richiesta API');
        }

        // Estrai i dati JSON dalla risposta

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const tracks = xmlDoc.querySelectorAll("Track");

        const trackList = [];
//        const linkTrascode = "/photo/:/transcode?width=200&height=220&minSize=1&upscale=1&url=";
        tracks.forEach(track => {
            const trackName = track.getAttribute("title");
            const trackDuration = track.getAttribute("duration");
            const trackId = track.getAttribute("ratingKey");

            const trackData = {
                name: trackName,
                duration: trackDuration,
                trackId: trackId
            };
            trackList.push(trackData);
        });

        return trackList;
        
    } catch (error) {
        // Gestisci gli errori
        console.error('Errore durante il recupero delle tracce dell\'album:', error);
        throw error; // Rilancia l'errore per gestirlo nel chiamante
    }
}


async function getPlexPlaylists(plexServerUrl, authToken) {
    try {
        const response = await fetch(`${plexServerUrl}/playlists`, {
            headers: {
                "X-Plex-Token": authToken,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch Plex playlists");
        }

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const playlists = xmlDoc.querySelectorAll('Playlist');



        const playlistList = [];
        const linkTrascode = "/photo/:/transcode?width=200&height=220&minSize=1&upscale=1&url=";
        playlists.forEach(playlist => {
        const playlistsName = playlist.getAttribute("title");
        const playlistDuration = playlist.getAttribute("duration");
        const playlistId = playlist.getAttribute("ratingKey");
        const playlistLength = playlist.getAttribute("leafCount");
        const playlistImage = playlist.getAttribute("composite");
        const playlistImageUrl = 
        plexServerUrl +
        linkTrascode +
        playlistImage +
        "&X-Plex-Token=" +
        authToken;

        const playlistData = {
            playlistName: playlistsName,
            playlistDuration: playlistDuration,
            playlistId: playlistId,
            playlistLength: playlistLength,
            playlistImageUrl: playlistImageUrl
        };
            playlistList.push(playlistData);
        });
        return playlistList;
    } catch (error) {
        throw new Error(`Error fetching Plex playlists: ${error.message}`);
    }
}


// Definisci la funzione PlaylistTracks
async function getPlaylistTracks(playlistId, plexServerUrl, authToken) {
    try {
        // Effettua la richiesta API per ottenere la lista delle tracce dell'album
        // Utilizza fetch o una libreria per effettuare la richiesta HTTP
        const response = await fetch(`${plexServerUrl}/playlists/${playlistId}/items`, {
            headers: {
                "X-Plex-Token": authToken,
            },
        });
        // Controlla lo stato della risposta
        if (!response.ok) {
            throw new Error('Errore nella richiesta API');
        }

        // Estrai i dati JSON dalla risposta

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const tracks = xmlDoc.querySelectorAll("Track");

        const trackList = [];
//        const linkTrascode = "/photo/:/transcode?width=200&height=220&minSize=1&upscale=1&url=";
        tracks.forEach(track => {
            const trackName = track.getAttribute("title");
            const trackDuration = track.getAttribute("duration");
            const trackParentTitle = track.getAttribute("parentTitle");
            const trackGrandparentTitle = track.getAttribute("grandparentTitle");
            const trackId = track.getAttribute("ratingKey");

            const trackData = {
                name: trackName,
                duration: trackDuration,
                trackId: trackId,
                albumName: trackParentTitle ,
                authorName: trackGrandparentTitle

            };
            trackList.push(trackData);
        });

        return trackList;
        
    } catch (error) {
        // Gestisci gli errori
        console.error('Errore durante il recupero delle tracce dell\'album:', error);
        throw error; // Rilancia l'errore per gestirlo nel chiamante
    }
}

class MyMusicCardEditor extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};

    // Lifecycle
    constructor() {
        super();
        this.doStyle();
        this.doAttach();
        this.doListen();
    }

    set hass(hass) {
        this._hass = hass;
        // Implement if needed
    }

    onChanged(event) {
        this.doMessageForUpdate(event);
    }

    // Jobs
    async doEditor() {
        // Inizializza i campi di input con i valori della configurazione
        this._elements.editor.innerHTML = `
            <div id="errorMessage" style="color: red; display: none;">Errore: compila tutti i campi obbligatori.</div>
            <div class="wrapper">
                <div class="section">
                    <h2>Player</h2>
                    <label class="label" for="activePlayer">Active Player:</label>
                    <input class="value" id="activePlayer" value="${this._config.player && this._config.player.activePlayer ? this._config.player.activePlayer : ''}">
                    </input>
                </div>
                <div class="section">
                    <h2>Music Provider</h2>
                    <label class="label" for="provider">Provider:</label>
                    <select class="value" id="provider">
                        <option value="plex" ${this._config.musicProvider && this._config.musicProvider.provider === 'plex' ? 'selected' : ''}>Plex</option>
                        <option value="spotify" ${this._config.musicProvider && this._config.musicProvider.provider === 'spotify' ? 'selected' : ''}>Spotify</option>
                        <option value="radio" ${this._config.musicProvider && this._config.musicProvider.provider === 'radio' ? 'selected' : ''}>Radio</option>
                    </select>
                </div>
                <div class="section">
                    <h2>Other Settings</h2>
                    <label class="label" for="plexServerUrl">Plex Server URL:</label>
                    <input class="value" id="plexServerUrl" value="${this._config.plexServerUrl || ''}">
                    </input>
                    <label class="label" for="authToken">Auth Token:</label>
                    <input class="value" id="authToken" value="${this._config.authToken || ''}">
                    </input>
                    <label class="label" for="sourceType">Source Type:</label>
                    <select class="value" id="sourceType">
                        <option value="library" ${this._config.sourceType === 'library' ? 'selected' : ''}>Library</option>
                        <option value="playlist" ${this._config.sourceType === 'playlist' ? 'selected' : ''}>Playlist</option>
                    </select>
                    <div id="activeLibrarySection" style="display: ${this._config.sourceType === 'library' ? 'block' : 'none'};">
                        <label class="label" for="activeLibrary">Active Library:</label>
                        <input class="value" list="libraryOptions" id="activeLibrary">
                        <datalist id="libraryOptions"></datalist>
                    </div>
                </div>
            </div>
        `;

        // Carica le librerie musicali solo se la configurazione contiene plexServerUrl e authToken
        if (this._config.plexServerUrl && this._config.authToken && this._config.sourceType === 'library') {
            try {
                const libraries = await getMusicLibraries(this._config.plexServerUrl, this._config.authToken);
                const activeLibraryDatalist = this._elements.editor.querySelector("#libraryOptions");
                const activeLibraryInput = this._elements.editor.querySelector("#activeLibrary");
                libraries.forEach(library => {
                    const option = document.createElement("option");
                    option.value = library.libraryName;
                    activeLibraryDatalist.appendChild(option);
                });
                activeLibraryInput.setAttribute("list", "libraryOptions");

                // Imposta il valore dell'input se esiste nella configurazione
                if (this._config.activeLibrary) {
                    activeLibraryInput.value = this._config.activeLibrary;
                }
            } catch (error) {
                console.error('Errore durante il recupero delle librerie musicali:', error);
            }
        }

        this.doQueryElements();
        this.doListen();
    }
    

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = styles;
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = styles;
        this.shadowRoot.appendChild(style);
        this._elements.editor = document.createElement("form");
        this._elements.editor.id = "editor";
        this.shadowRoot.appendChild(this._elements.editor);
    }   
    
    setConfig(config) {
        this._config = config;
        if (this._config) {
            this.doEditor();
        }
    }

    doQueryElements() {
        this._elements.plexServerUrl = this.shadowRoot.querySelector("#plexServerUrl");
        this._elements.authToken = this.shadowRoot.querySelector("#authToken");
        this._elements.activeLibrary = this.shadowRoot.querySelector("#activeLibrary");
        this._elements.activePlayer = this.shadowRoot.querySelector("#activePlayer");
        this._elements.provider = this.shadowRoot.querySelector("#provider");
        this._elements.sourceType = this.shadowRoot.querySelector("#sourceType");
    }

    doListen() {
        // Assicurati che gli elementi siano stati trovati prima di aggiungere gli event listener
        if (this._elements.plexServerUrl && this._elements.authToken && this._elements.activeLibrary && this._elements.activePlayer && this._elements.provider && this._elements.sourceType) {
            this._elements.plexServerUrl.addEventListener("input", this.onChanged.bind(this));
            this._elements.authToken.addEventListener("input", this.onChanged.bind(this));
            this._elements.activeLibrary.addEventListener("change", this.onChanged.bind(this));
            this._elements.activePlayer.addEventListener("input", this.onChanged.bind(this));
            this._elements.provider.addEventListener("change", this.onChanged.bind(this));
            this._elements.sourceType.addEventListener("change", this.onChanged.bind(this));
        }
    }

doMessageForUpdate(changedEvent) {
    const newConfig = Object.assign({}, this._config);
    const errorMessage = this.shadowRoot.querySelector("#errorMessage");
    if (changedEvent.target.id === "plexServerUrl") {
        newConfig.plexServerUrl = changedEvent.target.value;
    } else if (changedEvent.target.id === "authToken") {
        newConfig.authToken = changedEvent.target.value;
    } else if (changedEvent.target.id === "activeLibrary") {
        newConfig.activeLibrary = changedEvent.target.value;
    } else if (changedEvent.target.id === "activePlayer") {
        newConfig.player = newConfig.player || {};
        newConfig.player.activePlayer = changedEvent.target.value;
    } else if (changedEvent.target.id === "provider") {
        newConfig.musicProvider = newConfig.musicProvider || {};
        newConfig.musicProvider.provider = changedEvent.target.value;
        // Se il provider è impostato su "plex", controlla che plexServerUrl, authToken e sourceType siano compilati
        if (changedEvent.target.value === "plex") {
            if (!newConfig.plexServerUrl || !newConfig.authToken || !newConfig.sourceType) {
                errorMessage.style.display = "block";
                return;
            }
        }
    } else if (changedEvent.target.id === "sourceType") {
        newConfig.sourceType = changedEvent.target.value;
        this.toggleActiveLibraryFieldVisibility(newConfig.sourceType);
    }
    errorMessage.style.display = "none"; // Nascondi il messaggio di errore se non ci sono problemi
    const messageEvent = new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
    });
    this.dispatchEvent(messageEvent);
}
        
    async loadMusicLibraries() {
        try {
            const libraries = await getMusicLibraries(this._config.plexServerUrl, this._config.authToken);
            const libraryOptions = libraries.map(library => `<option value="${library.libraryId}">${library.libraryName}</option>`).join('');
            const activeLibrarySelect = this.shadowRoot.querySelector("#activeLibrary");
            activeLibrarySelect.innerHTML = libraryOptions;
        } catch (error) {
            console.error('Errore durante il recupero delle librerie musicali:', error);
        }
    }

    connectedCallback() {
        // Non è necessario chiamare doEditor() qui poiché viene già chiamato all'interno di setConfig() quando l'elemento è connesso
    }

    toggleActiveLibraryFieldVisibility(sourceType) {
        const activeLibrarySection = this._elements.editor.querySelector("#activeLibrarySection");
        activeLibrarySection.style.display = sourceType === 'library' ? 'block' : 'none';
    }
}

// modules/utilities.js

// Funzione per formattare la durata in ore, minuti e secondi
function formatDuration(duration) {
    const days = Math.floor(duration / 86400000); // 24 * 60 * 60 * 1000
    const hours = Math.floor((duration % 86400000) / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    let formattedDuration = '';

    // Se ci sono giorni, li aggiungiamo al formato
    if (days > 0) {
        formattedDuration += `${days}d `;
    }

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



async function playOnSonos(hass, config, machineIdentifier, trackId) {
    console.log("machineIdentifier", machineIdentifier);
    console.log("trackId", trackId);
    console.log("hass", hass);
    console.log("config", config);
 

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

const timestamp = 1715850304691;
const scriptSrc = `/local/MyMusicCardBundle.js?v=${timestamp}`;



class MyMusicCard extends HTMLElement {

    // private properties
    _config;
    _hass;
    _elements = {};
    _machineIdentifier;

    // lifecycle
    constructor() {
        super();
        this.doCard();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
    }    

    async setConfig(config) {
        this._config = config;
        this.doCheckConfig();
        this.doUpdateConfig();
    
        try {
            // Gestisci il provider in base alla configurazione
            await this.handleProvider();
        } catch (error) {
            console.error("Errore durante la configurazione della card:", error);
        }
    }
    

    set hass(hass) {
        this._hass = hass;
    }

    async handleProvider() {
        console.log("this._config", this._config);
        console.log("this._config.musicProvider.provider ", this._config.musicProvider.provider);
        switch (this._config.musicProvider.provider) {
            case "plex":
                await this.handlePlexProvider();
                break;
            case "spotify":
                this.handleSpotifyProvider();
                break;
            case "radio":
                this.handleRadioProvider();
                break;
            default:
                console.error("Provider non supportato:", this._config.provider);
        }
    }

    async handlePlexProvider() {
        await this.retrieveMachineIdentifier();
        console.log("hass!!!", this._hass);
        try {
            if (this._config.sourceType === "library") {
                const musicLibraryId = await this.retrieveMusicLibraryId();
                const artistLibrary = await this.retrieveArtistLibrary(musicLibraryId);
                this.populateArtistList(artistLibrary);
            } else if (this._config.sourceType === "playlist") {
                const playlists = await this.retrievePlexPlaylists();
                console.log("playlists!: ", playlists);
                this.populatePlaylistList(playlists);
            }
        } catch (error) {
            console.error("Errore durante il recupero della libreria musicale o delle playlist:", error);
        }
    }
    

    handleSpotifyProvider() {
        console.log("Mi occuperò di Spotify più tardi");
    }

    handleRadioProvider() {
        console.log("Mi occuperò delle radio più tardi");
    }

    async retrieveMachineIdentifier() {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;

        try {
            // Effettua la chiamata alle API di Plex per ottenere la lista degli album dell'artista
            const machineIdentifier = await getMachineIdentifier(confPlexServerUrl, confAuthToken);
            this._machineIdentifier = machineIdentifier;
        } catch (error) {
            console.error("Errore durante il recupero degli album dell'artista:", error);
            throw error;
        }
    }

    onClicked() {
        this.doToggle();
    }

    getHeader() {
        return this._config.header;
    }

    getEntityID() {
        return this._config.entity;
    }

    getState() {
        return this._hass.states[this.getEntityID()];
    } 

    getAttributes() {
        return this.getState().attributes
    }

    getName() {
        const friendlyName = this.getAttributes().friendly_name;
        return friendlyName ? friendlyName : this.getEntityID();
    }


    doCheckConfig() {
        if (!this._config || !this._config.player || !this._config.player.activePlayer) {
            throw new Error("Please define an activePlayer!");
        }
    }


    doQueryElements() {
        const card = this._elements.card;
        this._elements.artistContainer = card.querySelector(".artist-container");
        this._elements.playlistContainer = card.querySelector(".playlist-container");
        this._elements.searchInput = card.querySelector(".search-input");
        this._elements.searchInput.addEventListener("input", () => {
            this.filterArtistList(this._elements.searchInput.value);
        });
    }



    doCard() {
        this._elements.card = document.createElement("ha-card");
    
        // Creazione degli elementi HTML utilizzando JavaScript
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
    
        // Aggiungi un div artists-card
        const artistsCard = document.createElement("div");
        artistsCard.classList.add("artists-card");

        // Aggiungi un div playlists-card
        const playlistsCard = document.createElement("div");
        playlistsCard.classList.add("playlists-card");        
    
        // Aggiungi un input per la casella di ricerca
        const searchInput = document.createElement("input");
        searchInput.classList.add("search-input");
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search artists...");
        artistsCard.appendChild(searchInput);
    
        // Aggiungi un div per contenere la lista degli artisti
        const artistContainer = document.createElement("div");
        artistContainer.classList.add("artist-container");
        artistsCard.appendChild(artistContainer);

        // Aggiungi un div per contenere la lista delle playlist
        const playlistContainer = document.createElement("div");
        playlistContainer.classList.add("playlist-container");
        playlistsCard.appendChild(playlistContainer);
        
    
        // Aggiungi artists-card a cardContent
        cardContent.appendChild(artistsCard);

        // Aggiungi artists-card a cardContent
        cardContent.appendChild(playlistsCard);
        

        // Aggiungi cardContent all'elemento card
        this._elements.card.appendChild(cardContent);

    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = styles; // Utilizza lo stile importato
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.card);
    }

//    doQueryElements() {
//        const card = this._elements.card;
//        this._elements.artistContainer = card.querySelector(".artist-container");
//        this._elements.playlistContainer = card.querySelector(".playlist-container");
//    }

    doUpdateConfig() {
        this._elements.card.removeAttribute("header");
    }

    async retrieveMusicLibraryId() {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;
        const confActiveLibrary = this._config.activeLibrary;

        try {
            const musicLibraryId = await getMusicLibraryId(confPlexServerUrl, confAuthToken, confActiveLibrary);
            return musicLibraryId;
        } catch (error) {
            console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
        }
    }

    async retrievePlexPlaylists() {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;
    
        try {
            // Effettua la chiamata alle API di Plex per ottenere la lista delle playlist
            const playlists = await getPlexPlaylists(confPlexServerUrl, confAuthToken);
            return playlists;
        } catch (error) {
            console.error("Errore durante il recupero delle playlist da Plex:", error);
            throw error;
        }
    }
    


    async retrieveArtistLibrary(musicLibraryId) {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;

        try {
            const artistLibrary = await getArtistLibrary(musicLibraryId, confPlexServerUrl, confAuthToken);
            return artistLibrary;
        } catch (error) {
            console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
        }
    }

    populateArtistList(artistLibrary) {
        const artistContainer = this._elements.artistContainer;
        if (!artistContainer) {
            console.error("Elemento artist-container non trovato. Assicurati che esista nell'HTML.");
            return;
        }

        artistContainer.innerHTML = "";

        artistLibrary.forEach(artist => {
            const artistItem = document.createElement("div");
            artistItem.classList.add("artist-item");

            const artistImage = document.createElement("img");
            artistImage.classList.add("artist-image");
            artistImage.src = artist.image;
            artistImage.alt = artist.name;
            artistItem.appendChild(artistImage);

            const artistName = document.createElement("div");
            artistName.classList.add("artist-name");
            artistName.textContent = artist.name;
            artistItem.appendChild(artistName);

            artistItem.addEventListener("click", () => {
                this.showArtistDetail(artist);
            });

            artistContainer.appendChild(artistItem);
        });
    }

    populatePlaylistList(playlists) {
        this.hideSearchInput();
        const playlistContainer = this._elements.playlistContainer;
        if (!playlistContainer) {
            console.error("Elemento playlist-container non trovato. Assicurati che esista nell'HTML.");
            return;
        }
    
        // Cancella il contenuto dell'elemento playlistContainer
        playlistContainer.innerHTML = "";
    
        // Itera attraverso le playlist e crea elementi HTML per ognuna
        playlists.forEach(playlist => {
            //elimino la playlist di plex "All Music", troppo grande e non ha senso
            if (playlist.playlistLength > 0 && playlist.playlistName !== "All Music") {
                const playlistItem = document.createElement("div");
                playlistItem.classList.add("playlist-item");
    
                // Immagine della playlist
                const playlistImage = document.createElement("img");
                playlistImage.classList.add("playlist-image");
                playlistImage.src = playlist.playlistImageUrl;
                playlistItem.appendChild(playlistImage);
    
                // Nome della playlist
                const playlistName = document.createElement("div");
                playlistName.classList.add("playlist-name");
                playlistName.textContent = playlist.playlistName;
                playlistItem.appendChild(playlistName);
    
                // Numero di tracce nella playlist
                const tracksCount = document.createElement("div");
                tracksCount.classList.add("tracks-count");
                tracksCount.textContent = `Tracks: ${playlist.playlistLength}`;
                playlistItem.appendChild(tracksCount);
    
                // Durata totale della playlist
                const totalDuration = document.createElement("div");
                totalDuration.classList.add("total-duration");
                totalDuration.textContent = `Duration: ${formatDuration(playlist.playlistDuration)}`;
                playlistItem.appendChild(totalDuration);
    
                // Aggiungi un gestore di eventi al clic sulla playlist
                playlistItem.addEventListener("click", () => {
                    this.showPlaylistDetail(playlist);
                });
    
                playlistContainer.appendChild(playlistItem);
            }
        });
    }
        

    
    async showArtistDetail(artist) {
        const cardContent = this._elements.card.querySelector(".card-content");
        const artistsCard = this._elements.card.querySelector(".artists-card");
    
        artistsCard.style.display = "none";
    
        const artistDetail = document.createElement("div");
        artistDetail.classList.add("artist-detail");
    
        // Aggiungi il div artist-detail-header
        const artistDetailHeader = document.createElement("div");
        artistDetailHeader.classList.add("artist-detail-header");
    
        // Aggiungi l'immagine dell'artista all'interno di artist-detail-header
        const artistImage = document.createElement("img");
        artistImage.classList.add("artist-image");
        artistImage.src = artist.image; // Assumi che ci sia un campo 'image' nell'oggetto artista che contenga l'URL dell'immagine
        artistDetailHeader.appendChild(artistImage);
    
    
        // Aggiungi artistDetailHeaderInfo a artist-detail-header
        const artistDetailHeaderInfo = document.createElement("div");
        artistDetailHeaderInfo.classList.add("artist-detail-header-info");

        // Aggiungi artistName a artist-detail-header
        const artistName = document.createElement("div");
        artistName.classList.add("artist-name");
        artistName.textContent = artist.name; // Assumi che ci sia un campo 'name' nell'oggetto artista che contenga il nome dell'artista
        artistDetailHeaderInfo.appendChild(artistName);        


       // Aggiungi "Artista"  a artist-detail-header
       const mediaType = document.createElement("div");
       mediaType.classList.add("media-type");
       mediaType.textContent = "Artista";
       artistDetailHeaderInfo.appendChild(mediaType);        


        // Aggiungi il pulsante "Riproduci"
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.textContent = "Riproduci";
        playButton.addEventListener("click", (event) => {
            event.stopPropagation();
            playOnSonos(this._hass, this._config, this._machineIdentifier, artist.artistKey);
        });
        artistDetailHeaderInfo.appendChild(playButton);
    
        artistDetailHeader.appendChild(artistDetailHeaderInfo);
    
        // Aggiungi artist-detail-header a artist-detail
        artistDetail.appendChild(artistDetailHeader);
    
        // Effettua la chiamata alle API di Plex per ottenere la lista degli album dell'artista
        try {
            const albums = await this.retrieveArtistAlbums(artist.artistKey);
    
            if (albums && Array.isArray(albums)) {
                // Crea una griglia per gli album
                const albumGrid = document.createElement("div");
                albumGrid.classList.add("album-grid");
    
                // Aggiungi ogni album alla griglia
                albums.forEach(album => {
                    const albumItem = document.createElement("div");
                    albumItem.classList.add("album-item");
    
                    // Aggiungi l'immagine dell'album
                    const albumImage = document.createElement("img");
                    albumImage.classList.add("album-image");
                    albumImage.src = album.image; // Assumi che ci sia un campo 'image' nell'oggetto album che contenga l'URL dell'immagine
                    albumItem.appendChild(albumImage);
    
                    // Aggiungi il titolo dell'album
                    const albumTitle = document.createElement("div");
                    albumTitle.classList.add("album-title");
                    albumTitle.textContent = album.name; // Assumi che ci sia un campo 'title' nell'oggetto album che contenga il titolo dell'album
                    albumItem.appendChild(albumTitle);
    
                    // Aggiungi l'anno dell'album
                    const albumYear = document.createElement("div");
                    albumYear.classList.add("album-year");
                    albumYear.textContent = album.year; // Assumi che ci sia un campo 'year' nell'oggetto album che contenga l'anno di uscita dell'album
                    albumItem.appendChild(albumYear);
    
                    // Aggiungi un gestore di eventi per il clic sull'album
                    albumItem.addEventListener("click", (event) => {
                        event.stopPropagation();
                        this.showAlbumDetail(album); 
                        // Inserisci qui la gestione del clic sull'album
                    });
    
                    // Aggiungi l'elemento dell'album alla griglia
                    albumGrid.appendChild(albumItem);               
                });
    
                // Aggiungi la griglia degli album all'elemento artistDetail
                artistDetail.appendChild(albumGrid);
            } else {
                const noAlbumsMessage = document.createElement("div");
                noAlbumsMessage.textContent = "No albums found";
                artistDetail.appendChild(noAlbumsMessage);
            }
        } catch (error) {
            console.error("Errore durante il recupero degli album dell'artista:", error);
            const errorElement = document.createElement("div");
            errorElement.textContent = "Failed to retrieve albums";
            artistDetail.appendChild(errorElement);
        }
    
        // Aggiungi un gestore di eventi per nascondere l'elemento quando ci si clicca sopra
        artistDetail.addEventListener("click", () => {
            this.hideArtistDetail();
        });
    
        cardContent.appendChild(artistDetail);
    }


    

    async showAlbumDetail(album) {
        const cardContent = this._elements.card.querySelector(".card-content");
        const artistDetail = this._elements.card.querySelector(".artist-detail");
        artistDetail.style.display = "none";

        const albumDetail = document.createElement("div");
        albumDetail.classList.add("album-detail");



        const albumDetailHeader = document.createElement("div");
        albumDetailHeader.classList.add("album-detail-header");

        // Aggiungi l'immagine dell'album
        const albumImage = document.createElement("img");
        albumImage.classList.add("album-image");
        albumImage.src = album.image; 
        albumDetailHeader.appendChild(albumImage);

        const albumDetailHeaderInfo = document.createElement("div");
        albumDetailHeaderInfo.classList.add("album-detail-header-info");

        // Aggiungi il nome dell'album
        const albumName = document.createElement("div");
        albumName.classList.add("album-name");
        albumName.textContent = album.name + " - " + album.parentTitle;
        albumDetailHeaderInfo.appendChild(albumName);

       // Aggiungi "Artista"  a artist-detail-header
       const mediaType = document.createElement("div");
       mediaType.classList.add("media-type");
       mediaType.textContent = "Album";
       albumDetailHeaderInfo.appendChild(mediaType);                

        // Aggiungi il pulsante "Riproduci"
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.textContent = "Riproduci";
        playButton.addEventListener("click", (event) => {
            event.stopPropagation();
            playOnSonos(this._hass, this._config, this._machineIdentifier, album.albumKey);
        });
        albumDetailHeaderInfo.appendChild(playButton);


        albumDetailHeader.appendChild(albumDetailHeaderInfo);
        albumDetail.appendChild(albumDetailHeader);

        // Effettua la chiamata alle API di Plex per ottenere la lista dei brani dell'album
        try {
            const tracks = await this.retrieveAlbumTracks(album.albumKey);
            
            if (tracks && Array.isArray(tracks)) {
                // Crea un div per contenere la lista dei brani
                const trackContainer = document.createElement("div");
                trackContainer.classList.add("track-container");

                tracks.forEach(track => {
                    // Crea un div per ogni brano
                    const trackItem = document.createElement("div");
                    trackItem.classList.add("track-item");

                    // Aggiungi l'icona "&#9654" prima del nome della traccia
                    const triangleIcon = document.createElement("div");
                    triangleIcon.classList.add("triangle-icon");
                    triangleIcon.textContent = "\u25B6";
                    trackItem.appendChild(triangleIcon);

                    // Aggiungi il nome della traccia
                    const trackName = document.createElement("div");
                    trackName.classList.add("track-name");
                    trackName.textContent = track.name;
                    trackItem.appendChild(trackName);

                    // Aggiungi un gestore di eventi al clic sull'icona per gestire l'evento clic sulla traccia
                    triangleIcon.addEventListener("click", (event) => {
                        event.stopPropagation();
                        playOnSonos(this._hass, this._config, this._machineIdentifier, track.trackId);
                    });

                    // Aggiungi la durata della traccia
                    const trackDuration = document.createElement("div");
                    trackDuration.classList.add("track-duration");
                    trackDuration.textContent = formatDuration(track.duration);
                    trackItem.appendChild(trackDuration);

                    trackContainer.appendChild(trackItem);
                });

                albumDetail.appendChild(trackContainer);
            }    

        } catch (error) {
            console.error("Errore durante il recupero dei brani dell'album:", error);
        }




        // Aggiungi un gestore di eventi per nascondere l'elemento quando ci si clicca sopra
        albumDetail.addEventListener("click", (event) => {
            // Controlla se il click è avvenuto sull'icona o sul nome dell'album, altrimenti ignora l'evento
            if (!event.target.classList.contains("triangle-icon") && !event.target.classList.contains("album-name")) {
                this.hideAlbumDetail();
            }
        });

        cardContent.appendChild(albumDetail);
    }

    
    async showPlaylistDetail(playlist) {
        const cardContent = this._elements.card.querySelector(".card-content");
        const playlistsCard = this._elements.card.querySelector(".playlists-card");
        playlistsCard.style.display = "none";
    
        const playlistDetail = document.createElement("div");
        playlistDetail.classList.add("playlist-detail");
    
        // Aggiungi l'intestazione della playlist
        const playlistHeader = document.createElement("div");
        playlistHeader.classList.add("playlist-header");
    
        // Immagine della playlist
        const playlistImage = document.createElement("img");
        playlistImage.classList.add("playlist-image");
        playlistImage.src = playlist.playlistImageUrl;
        playlistHeader.appendChild(playlistImage);
    
        // Raggruppa playlist-title, playlist-type e play-button in un unico div
        const playlistInfo = document.createElement("div");
        playlistInfo.classList.add("playlist-info");
    
        // Titolo della playlist
        const playlistTitle = document.createElement("div");
        playlistTitle.classList.add("playlist-title");
        playlistTitle.textContent = playlist.playlistName;
        playlistInfo.appendChild(playlistTitle);
    
        // Aggiungi la scritta "Playlist" sotto il titolo della playlist
        const playlistType = document.createElement("div");
        playlistType.classList.add("playlist-type");
        playlistType.textContent = "Playlist";
        playlistInfo.appendChild(playlistType);
    
        // Aggiungi il tasto "Riproduci"
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.textContent = "Riproduci";

        playButton.addEventListener("click", (event) => {
            event.stopPropagation();
            playOnSonos(this._hass, this._config, this._machineIdentifier, playlist.playlistId);
        });


        playlistInfo.appendChild(playButton);
    
        playlistHeader.appendChild(playlistInfo);
    
        playlistDetail.appendChild(playlistHeader);
    
        // Effettua la chiamata alle API per ottenere la lista delle tracce della playlist
        try {
            const tracks = await this.retrievePlaylistTracks(playlist.playlistId);
    
            if (tracks && Array.isArray(tracks)) {
                console.log("tracks: ", tracks);
                // Crea un div per contenere la lista delle tracce
                const trackList = document.createElement("div");
                trackList.classList.add("track-list");
    
                tracks.forEach(track => {
                    // Crea un div per ogni traccia
                    const trackItem = document.createElement("div");
                    trackItem.classList.add("track-item");
    
                    // Aggiungi l'icona del triangolo a sinistra
                    const triangleIcon = document.createElement("div");
                    triangleIcon.classList.add("triangle-icon");
                    triangleIcon.textContent = "\u25B6";
                    trackItem.appendChild(triangleIcon);
    
                    // Contenitore per il titolo, l'autore e l'album
                    const trackDetails = document.createElement("div");
                    trackDetails.classList.add("track-details");
    
                    // Titolo del brano in grassetto
                    const trackTitle = document.createElement("div");
                    trackTitle.classList.add("track-title");
                    trackTitle.textContent = track.name;
                    trackDetails.appendChild(trackTitle);
    
                    // Autore e Album
                    const authorAlbum = document.createElement("div");
                    authorAlbum.classList.add("author-album");
                    authorAlbum.textContent = `${track.authorName} - ${track.albumName}`;
                    trackDetails.appendChild(authorAlbum);
    
                    trackItem.appendChild(trackDetails);
    
                    // Aggiungi la durata del brano allineata a destra
                    const trackDuration = document.createElement("div");
                    trackDuration.classList.add("track-duration");
                    trackDuration.textContent = formatDuration(track.duration);
                    trackItem.appendChild(trackDuration);
    
                    // Aggiungi un gestore di eventi per il clic sull'icona del triangolo
                    triangleIcon.addEventListener("click", (event) => {
                        event.stopPropagation();
                        playOnSonos(this._hass, this._config, this._machineIdentifier, track.trackId);
                    });
    
                    trackList.appendChild(trackItem);
                });
    
                playlistDetail.appendChild(trackList);
            }    
    
        } catch (error) {
            console.error("Errore durante il recupero delle tracce della playlist:", error);
        }
    
        // Aggiungi un gestore di eventi per nascondere l'elemento quando ci si clicca sopra
        playlistDetail.addEventListener("click", () => {
            this.hidePlaylistDetail();
        });
    
        cardContent.appendChild(playlistDetail);
    }
    
    
 
    

    async retrieveArtistAlbums(artistId) {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;

        try {
            const albums = await getArtistAlbums(artistId, confPlexServerUrl, confAuthToken);
            return albums;
        } catch (error) {
            console.error("Errore durante il recupero degli album dell'artista:", error);
            throw error;
        }
    }

    async retrieveAlbumTracks(albumKey) {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;

        try {
            const tracks = await getAlbumTracks(albumKey, confPlexServerUrl, confAuthToken);
            return tracks;
        } catch (error) {
            console.error("Errore durante il recupero delle tracce dell'album:", error);
            throw error;
        }
    }



    async retrievePlaylistTracks(playlistId) {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;

        try {
            const tracks = await getPlaylistTracks(playlistId, confPlexServerUrl, confAuthToken);
            return tracks;
        } catch (error) {
            console.error("Errore durante il recupero delle tracce dell'album:", error);
            throw error;
        }
    }

    hideArtistDetail() {
        const artistsCard = this._elements.card.querySelector(".artists-card");
        const artistDetail = this._elements.card.querySelector(".artist-detail");
        artistsCard.style.display = "block";
        artistDetail.parentNode.removeChild(artistDetail);
    }

    hidePlaylistDetail() {
        const playlistsCard = this._elements.card.querySelector(".playlists-card");
        const playlistDetail = this._elements.card.querySelector(".playlist-detail");
        playlistsCard.style.display = "block";
        playlistDetail.parentNode.removeChild(playlistDetail);
    }


    hideAlbumDetail() {
        const artistDetail = this._elements.card.querySelector(".artist-detail");
        const albumDetail = this._elements.card.querySelector(".album-detail");
        artistDetail.style.display = "block";
        albumDetail.parentNode.removeChild(albumDetail);
    }





    
    filterArtistList(searchTerm) {
        const artistItems = this._elements.card.querySelectorAll(".artist-item");

        artistItems.forEach(artistItem => {
            const artistName = artistItem.querySelector(".artist-name").textContent.toLowerCase();

            if (artistName.includes(searchTerm.toLowerCase())) {
                artistItem.style.display = "block";
            } else {
                artistItem.style.display = "none";
            }
        });
    }

    hideSearchInput() {
        const searchInput = this._elements.card.querySelector(".search-input");
        searchInput.remove();
    }

    // configuration defaults
    static getStubConfig() {
        return { entity: "input_boolean.tcwsd" }
    }

    // card configuration
    static getConfigElement() {
        return document.createElement("my-music-card-editor");
    }
}

customElements.define('my-music-card', MyMusicCard);
customElements.define("my-music-card-editor", MyMusicCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "my-music-card",
    name: "Vanilla Js my Music Card With Shadow DOM",
    description: "My music card"
});

export { scriptSrc as default };
