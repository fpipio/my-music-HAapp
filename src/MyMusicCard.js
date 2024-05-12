const timestamp = TIMESTAMP;
const scriptSrc = `/local/MyMusicCardBundle.js?v=${timestamp}`;
export default scriptSrc;

import { styles } from './modules/styles.js';

import { MyMusicCardEditor } from './MyMusicCardEditor.js';
import { getMusicLibraryId } from './modules/plexApi.js'; 
import { getArtistLibrary} from './modules/plexApi.js'; 
import { getArtistAlbums } from './modules/plexApi.js';
import { getAlbumTracks } from './modules/plexApi.js';
import { formatDuration } from './modules/utilities.js';
import { getMachineIdentifier } from './modules/plexApi.js';
import { playOnSonos } from './modules/utilities.js';




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
        this.retrieveMachineIdentifier()
    
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
        const confAuthToken = this._config.authToken
        const confActiveLibrary = this._config.activeLibrary

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
        const confAuthToken = this._config.authToken

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
       mediaType.textContent = "Artista"
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
       mediaType.textContent = "Album"
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