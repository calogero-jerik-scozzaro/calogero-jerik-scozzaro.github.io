# Compilazione del CV e del sito GitHub Pages

Esegui i comandi dal Terminale, nella cartella del repository:

```sh
cd '/Users/jerik/Desktop/varie AI/github_io/calogero-jerik-scozzaro.github.io'
```

## 1. Compilare il CV LaTeX

Modifica `main_latex.tex`, quindi compila con `latexmk` (esegue automaticamente i passaggi necessari):

```sh
mkdir -p tmp/pdfs
latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=tmp/pdfs main_latex.tex
```

Il risultato è `tmp/pdfs/main_latex.pdf`. Aprilo per controllare impaginazione e contenuto:

```sh
open tmp/pdfs/main_latex.pdf
```

Per verificare che il CV abbia una sola pagina:

```sh
pdfinfo tmp/pdfs/main_latex.pdf
```

La voce `Pages` deve essere `1`. Per ottenere anche un'immagine di anteprima, se hai Poppler installato:

```sh
pdftoppm -scale-to 1500 -png tmp/pdfs/main_latex.pdf tmp/pdfs/cv
open tmp/pdfs/cv-1.png
```

Dopo il controllo, aggiorna il PDF scaricabile dal sito:

```sh
cp tmp/pdfs/main_latex.pdf 'Calogero Jerik Scozzaro_cv.pdf'
```

Se `latexmk` non è disponibile ma hai `pdflatex`, usa questi comandi al suo posto:

```sh
mkdir -p tmp/pdfs
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tmp/pdfs main_latex.tex
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=tmp/pdfs main_latex.tex
```

## 2. Aggiornare il sito

Il sito è statico: non richiede `npm install` o un bundler. Puoi modificare:

- `index.html`: testi, struttura, esperienza e riconoscimenti.
- `style.css`: stile e layout.
- `script.js`: selezione del tema chiaro/scuro.
- `publications.json`: pubblicazioni e relativi collegamenti.

Quando cambi `publications.json`, rigenera le sezioni delle pubblicazioni in `index.html`:

```sh
python3 scripts/build_publications.py
```

Il campo `selected: true` inserisce un paper tra le pubblicazioni selezionate; `order` ne determina la posizione. Mantieni nel JSON i cinque paper selezionati, nello stesso ordine del CV. Modifica queste voci nel JSON, perché la rigenerazione sostituisce i blocchi delle pubblicazioni nell'HTML.

Verifica che JSON e HTML siano sincronizzati e che il diff non contenga errori di spaziatura:

```sh
python3 scripts/build_publications.py --check
git diff --check
```

Il CV LaTeX va aggiornato separatamente: lo script rigenera soltanto le pubblicazioni del sito.

## 3. Anteprima locale

Avvia il server dalla cartella del repository:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Apri **http://127.0.0.1:8765/** nel browser. Il Terminale resta occupato dal server; per altri comandi usa una seconda scheda. Ferma il server con **Ctrl+C**.

Se la porta 8765 è già occupata, usa:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

In questo caso apri **http://127.0.0.1:8766/**. Controlla la pagina anche su una finestra stretta, entrambi i temi e i collegamenti al CV e ai certificati.

## 4. Pubblicare su GitHub

Una volta controllato il risultato, rivedi i file modificati:

```sh
git status --short
git diff --stat
git diff
```

Aggiungi i cambiamenti e controlla cosa sarà incluso nel commit:

```sh
git add -A
git diff --cached --stat
```

Poi crea il commit e invialo al ramo corrente su `origin`:

```sh
git commit -m "Update academic website and one-page CV"
git push origin HEAD
```

Il push invia i file a GitHub; la pubblicazione del sito segue la configurazione GitHub Pages del repository. Controlla il completamento del deployment nel repository, poi visita **https://calogero-jerik-scozzaro.github.io/**.

I file temporanei di compilazione sotto `tmp/` sono esclusi da Git tramite `.gitignore`.
