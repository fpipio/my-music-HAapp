import replace from '@rollup/plugin-replace'; // Assicurati di aver installato questo plugin tramite npm

export default {
    input: {
        card: 'src/MyMusicCard.js',
//        editor: 'src/MyMusicCardEditor.js',
    },
    output: {
        dir: 'dist/', // Il percorso del file di output
        format: 'es', // Il formato del bundle (es. iife, esm, cjs)
        entryFileNames: 'MyMusicCardBundle.js',
    },
    plugins: [
        replace({
          preventAssignment: true,
          TIMESTAMP: Date.now()
        })
      ]
};

