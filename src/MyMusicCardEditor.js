import { styles } from './modules/styles.js';

export class MyMusicCardEditor extends HTMLElement {
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
