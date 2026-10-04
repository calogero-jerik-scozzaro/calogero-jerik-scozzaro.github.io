#!/usr/bin/env python3
"""Render publications.json into index.html. Standard library only; no client fetch."""
import argparse
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SELF_NAMES = {'Calogero J. Scozzaro', 'Calogero Jerik Scozzaro'}

def render(pub):
    esc = html.escape
    title = esc(pub['title'])
    url = esc(pub['link'], quote=True)
    authors = ', '.join(
        f'<strong>{esc(name.strip())}</strong>' if name.strip() in SELF_NAMES else esc(name.strip())
        for name in pub['authors'].split(',')
    )
    label = f"{pub.get('short_venue', pub['venue'])} · {pub['year']}"
    if pub.get('status'):
        label += f" · {pub['status']}"
    anchor = f' id="paper-{esc(pub["id"], quote=True)}"' if pub.get('id') else ''
    lines = [f'<article class="pub"{anchor}>', f'  <p class="pub-venue">{esc(label)}</p>',
             f'  <h3><a href="{url}">{title}</a></h3>', f'  <p class="pub-authors">{authors}</p>']
    if pub.get('contribution'):
        lines.append(f'  <p class="pub-note">{esc(pub["contribution"])}</p>')
    if pub.get('summary'):
        lines.append(f'  <p class="pub-summary">{esc(pub["summary"])}</p>')
    links = [{'url': pub['link'], 'label': pub.get('link_label', 'Paper')}] + pub.get('resources', [])
    lines.append('  <div class="pub-links">' + ''.join(
        f'<a href="{esc(link["url"], quote=True)}">{esc(link["label"])} <span aria-hidden="true">↗</span></a>' for link in links) + '</div>')
    if pub.get('award'):
        lines.append(f'  <a class="badge" href="{esc(pub["award_link"], quote=True)}">{esc(pub["award"])}</a>')
    lines.append('</article>')
    return '\n'.join(lines)

def build():
    pubs = json.loads((ROOT / 'publications.json').read_text())
    selected = sorted((p for p in pubs if p.get('selected')), key=lambda p: p['order'])
    document = (ROOT / 'index.html').read_text()
    for section, entries in [('selected', selected)]:
        start, end = f'<!-- {section}-publications:start -->', f'<!-- {section}-publications:end -->'
        assert document.count(start) == document.count(end) == 1, f'Missing {section} markers'
        document = re.sub(re.escape(start) + r'.*?' + re.escape(end),
                          lambda _: start + '\n' + '\n'.join(map(render, entries)) + '\n' + end,
                          document, flags=re.S)
    return document

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Check that the committed HTML matches the JSON')
    args = parser.parse_args()
    document = build()
    target = ROOT / 'index.html'
    if args.check:
        if target.read_text() != document:
            raise SystemExit('Publication HTML is stale: run python3 scripts/build_publications.py')
        print('Publication HTML matches publications.json.')
    else:
        target.write_text(document)
        print('Updated publication HTML.')
