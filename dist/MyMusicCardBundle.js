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

`;

class MyMusicCardEditor extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};

    // Lifecycle
    constructor() {
        super();
        this.doEditor();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }

    setConfig(config) {
        this._config = config;
        this.doUpdateConfig();
    }

    set hass(hass) {
        this._hass = hass;
        this.doUpdateHass();
    }

    onChanged(event) {
        this.doMessageForUpdate(event);
    }

    // Jobs
    doEditor() {
        this._elements.editor = document.createElement("form");
        this._elements.editor.innerHTML = `
            <div class="row"><label class="label" for="plexServerUrl">Plex Server URL:</label><input class="value" id="plexServerUrl"></input></div>
            <div class="row"><label class="label" for="authToken">Auth Token:</label><input class="value" id="authToken"></input></div>
            <div class="row"><label class="label" for="activeLibrary">Active Library:</label><input class="value" id="activeLibrary"></input></div>
            <div class="row"><label class="label" for="activePlayer">Active Player:</label><input class="value" id="activePlayer"></input></div>

            
        `;
    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = styles; // Utilizza gli stili importati
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.editor);
    }

    doQueryElements() {
        this._elements.plexServerUrl = this._elements.editor.querySelector("#plexServerUrl");
        this._elements.authToken = this._elements.editor.querySelector("#authToken");
        this._elements.activeLibrary = this._elements.editor.querySelector("#activeLibrary");
        this._elements.activePlayer = this._elements.editor.querySelector("#activePlayer");
    }

    doListen() {
        this._elements.plexServerUrl.addEventListener("focusout", this.onChanged.bind(this));
        this._elements.authToken.addEventListener("focusout", this.onChanged.bind(this));
        this._elements.activeLibrary.addEventListener("focusout", this.onChanged.bind(this));
        this._elements.activePlayer.addEventListener("focusout", this.onChanged.bind(this));
        
    }

    doUpdateConfig() {
        this._elements.plexServerUrl.value = this._config.plexServerUrl;
        this._elements.authToken.value = this._config.authToken;
        this._elements.activeLibrary.value = this._config.activeLibrary;
        this._elements.activePlayer.value = this._config.activePlayer;
    }

    doUpdateHass() {}

    doMessageForUpdate(changedEvent) {
        // this._config is readonly, copy needed
        const newConfig = Object.assign({}, this._config);
        if (changedEvent.target.id === "plexServerUrl") {
            newConfig.plexServerUrl = changedEvent.target.value;
        } else if (changedEvent.target.id === "authToken") {
            newConfig.authToken = changedEvent.target.value;
        } else if (changedEvent.target.id === "activeLibrary") {
            newConfig.activeLibrary = changedEvent.target.value;
        } else if (changedEvent.target.id === "activePlayer") {
            newConfig.activePlayer = changedEvent.target.value;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}

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

// modules/utilities.js

// Funzione per formattare la durata in ore, minuti e secondi
function formatDuration(duration) {
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


async function playOnSonos(hass, config, machineIdentifier, trackId) {
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

const timestamp = 1715503970772;
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
        
//        this.doListen();
    }    



    
    async setConfig(config) {
        this._config = config;
        this.doCheckConfig();
        this.doUpdateConfig();
        this.retrieveMachineIdentifier();
    
        try {
            // Utilizza await per ottenere il valore di musicLibraryId
            const musicLibraryId = await this.retrieveMusicLibraryId();
            

            const artistLibrary = await this.retrieveArtistLibrary(musicLibraryId);
            this.populateArtistList(artistLibrary);


        } catch (error) {
            console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
        }
    }
    


    set hass(hass) {
        this._hass = hass;
//        this.doUpdateHass()
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

    // jobs
    doCheckConfig() {
        if (!this._config.entity) {
            throw new Error('Please define an entity!');
        }
    }

    doCard() {
        this._elements.card = document.createElement("ha-card");
    
        // Creazione degli elementi HTML utilizzando JavaScript
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
    
        // Aggiungi un div artists-card
        const artistsCard = document.createElement("div");
        artistsCard.classList.add("artists-card");
    
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
    
        // Aggiungi artists-card a cardContent
        cardContent.appendChild(artistsCard);
    
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

    doQueryElements() {
        const card = this._elements.card;
        this._elements.artistContainer = card.querySelector(".artist-container");
    }
    
    doUpdateConfig() {
//        if (this.getHeader()) {
//            this._elements.card.setAttribute("header", this.getHeader());
//        } else {
//            this._elements.card.removeAttribute("header");
//        }
          this._elements.card.removeAttribute("header");
    }

    async retrieveMusicLibraryId() {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;
        const confActiveLibrary = this._config.activeLibrary;

        try {
            const musicLibraryId = await getMusicLibraryId(confPlexServerUrl, confAuthToken, confActiveLibrary); // Utilizzare la funzione importata
            return musicLibraryId;
            // Continua a costruire il resto della tua card qui...
        } catch (error) {
            console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
        }
    }

    async retrieveArtistLibrary(musicLibraryId) {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;

        try {
            const artistLibrary = await getArtistLibrary(musicLibraryId, confPlexServerUrl, confAuthToken); // Utilizzare la funzione importata
            return artistLibrary;
            // Continua a costruire il resto della tua card qui...
        } catch (error) {
            console.error("Errore durante il recupero dell'ID della libreria della musica:", error);
        }
    }

    populateArtistList(artistLibrary) {
        // Ottieni l'elemento in cui inserire la lista degli artisti
        const artistContainer = this._elements.artistContainer;
        if (!artistContainer) {
            console.error("Elemento artist-container non trovato. Assicurati che esista nell'HTML.");
            return;
        }

        // Pulisci eventuali contenuti preesistenti
        artistContainer.innerHTML = "";

    // Crea e aggiungi gli elementi degli artisti alla card
        artistLibrary.forEach(artist => {
            const artistItem = document.createElement("div");
            artistItem.classList.add("artist-item");

            // Crea l'elemento immagine per la foto dell'artista
            const artistImage = document.createElement("img");
            artistImage.classList.add("artist-image");
            artistImage.src = artist.image; // Assumi che ci sia un campo 'image' nell'oggetto artista che contenga l'URL dell'immagine
            artistImage.alt = artist.name; // Assumi che ci sia un campo 'name' nell'oggetto artista che contenga il nome dell'artista
            artistItem.appendChild(artistImage);

            // Crea l'elemento per il nome dell'artista
            const artistName = document.createElement("div");
            artistName.classList.add("artist-name");
            artistName.textContent = artist.name; // Assumi che ci sia un campo 'name' nell'oggetto artista che contenga il nome dell'artista
            artistItem.appendChild(artistName);

            artistItem.addEventListener("click", () => {
                this.showArtistDetail(artist);
            });

            // Aggiungi l'elemento dell'artista al contenitore degli artisti
            artistContainer.appendChild(artistItem);
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
        console.log("Album: ", album);

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
                    triangleIcon.addEventListener("click", () => {
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






    async retrieveArtistAlbums(artistId) {
        const confPlexServerUrl = this._config.plexServerUrl;
        const confAuthToken = this._config.authToken;
        

        try {
            // Effettua la chiamata alle API di Plex per ottenere la lista degli album dell'artista
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
            // Effettua la chiamata alle API di Plex per ottenere la lista degli album dell'artista
            const tracks = await getAlbumTracks(albumKey, confPlexServerUrl, confAuthToken);
            return tracks;
        } catch (error) {
            console.error("Errore durante il recupero delle tracce dell'album:", error);
            throw error;
        }
    }




    // Definisci la funzione hideArtistDetail per gestire l'evento click e invertire la visibilità di artistsCard e artist-detail
    hideArtistDetail() {
        const artistsCard = this._elements.card.querySelector(".artists-card");
        const artistDetail = this._elements.card.querySelector(".artist-detail");
        artistsCard.style.display = "block";
        artistDetail.parentNode.removeChild(artistDetail);
    }

    hideAlbumDetail() {
//        const artistsCard = this._elements.card.querySelector(".artists-card");
        const artistDetail = this._elements.card.querySelector(".artist-detail");
        const albumDetail = this._elements.card.querySelector(".album-detail");
        artistDetail.style.display = "block";
        albumDetail.parentNode.removeChild(albumDetail);
    }    


    doQueryElements() {
        const card = this._elements.card;
        this._elements.artistContainer = card.querySelector(".artist-container");
//        this._elements.artistList = card.querySelector(".artist-list");
        this._elements.searchInput = card.querySelector(".search-input");
        this._elements.searchInput.addEventListener("input", () => {
            this.filterArtistList(this._elements.searchInput.value);
        });
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
customElements.define("my-music-card-editor",MyMusicCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "my-music-card",
    name: "Vanilla Js my Music Card With Shadow DOM",
    description: "My music card"
});

export { scriptSrc as default };
