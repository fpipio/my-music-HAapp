import { styles } from './modules/styles.js';
import { getMusicLibraries } from './modules/plexApi.js'; 

export class MyMusicCardEditor extends HTMLElement {
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
