# Calogero Jerik Scozzaro — academic website

Static GitHub Pages website. No framework, package install, web fonts, or CDN assets are required. Publications are included in the HTML so the content remains available without JavaScript; JavaScript only controls the colour theme.

## Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. Check the desktop and mobile layouts, both colour themes, and the CV/certificate links before publishing.

## Update publications

Edit `publications.json`, then run:

```sh
python3 scripts/build_publications.py
python3 scripts/build_publications.py --check
```

`selected: true` and `order` control the four featured papers. Other entries appear under “More publications”. `link_label` identifies resources correctly when a paper page is not yet available. CERVINO is marked accepted at EMNLP 2026 and links to its dataset. Author order follows the bibliographic record; AlBERTurin's co-first authorship is stated separately.

## Build the CV

The editable source is `main_latex.tex`. It uses standard LaTeX packages, a single-column layout, selectable text and linked publications.

```sh
mkdir -p tmp/pdfs
latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=tmp/pdfs main_latex.tex
pdftoppm -scale-to 1500 -png tmp/pdfs/main_latex.pdf tmp/pdfs/cv
```

The CV has one page, with Education and Selected publications. Inspect the rendered page before replacing the download:

```sh
cp tmp/pdfs/main_latex.pdf 'Calogero Jerik Scozzaro_cv.pdf'
```

The source includes an `applicationdetails` macro for the candidate's confirmed expected PhD graduation and internship availability. Do not infer these dates.

## Content sources

Verified on 4 October 2026:

- [Beyond the Average Reader — ACL Anthology](https://aclanthology.org/2025.findings-acl.789/).
- [Paired Models’ Perplexity Optimization — IEEE TAI DOI](https://doi.org/10.1109/TAI.2026.3730663); title, authors and year checked against the [Crossref record](https://api.crossref.org/works/10.1109/TAI.2026.3730663).
- [CERVINO — co-author's university page](https://www.univda.it/docenti/revelli-luisa/), [dataset](https://doi.org/10.5281/zenodo.22082820), and [pymovements bibliography](https://pymovements.readthedocs.io/en/latest/bibliography.html).
- [AlBERTurin — official model card](https://huggingface.co/AlBERTurin/AlBERTone101) and [CLiC-it award announcement](https://clic2026.unipa.it/awards/). Equal contribution/co-first authorship supplied by Calogero Jerik Scozzaro; the public model card establishes author order.
- [Kenji-Endo — ACL Anthology](https://aclanthology.org/2026.evalita-1.4/).
- [University of Zurich — Digital Linguistics team](https://www.cl.uzh.ch/en/research-groups/digital-linguistics/people.html): visiting researcher, March–May 2026. LinkedIn's public page did not expose the visit's dates.
- CLiC-it certificate supplied as `award_clic2026.jpg`: Best Student Paper Award, Mention of Honor, “Outstanding contribution to Italian NLP resources”.
- IEEE MetroXRAINE certificate supplied as `award_METROXRAINE25.pdf`, also available [from the conference](https://metroxraine.org/metroxraine2025/files/Best_Paper_Young.pdf). Both recognitions are attributed to the paper and its co-authors.
- Education and fellowships retained from the existing CV/site. The final CV contains only Education and Selected publications, as requested. Supervisor details supplied by the candidate: Prof. Daniele P. Radicioni (Turin) and Prof. Lena A. Jäger (UZH).

## Publication

The checked-in root `index.html`, assets, certificates and CV are the GitHub Pages output. Preview changes locally, then commit and push when ready. No deployment is performed by the build scripts.
