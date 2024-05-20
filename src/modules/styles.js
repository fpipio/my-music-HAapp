export const styles = `

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
    aspect-ratio: 1 / 1;

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
    margin-left: auto; 
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



.playlist-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
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
    width: 145px; /* Imposta la larghezza desiderata */
    height: auto; /* Imposta l'altezza automaticamente in base all'immagine */
    margin-right: 10px;
    object-fit: cover;
    aspect-ratio: 1 / 1;


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
    padding-right: 5px;
}

.author-album {
    font-style: italic; /* Aggiunge stile corsivo all'autore */
    padding-right: 5px;
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
