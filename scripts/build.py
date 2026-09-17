"""Validate and package the dependency-free website for GitHub Pages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import shutil
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '_site'
FILES = ('index.html', '404.html', 'about.html', '.nojekyll', 'cv2026.pdf', 'cv2024.pdf', 'weiyang-cv.pdf')
DIRECTORIES = ('assets/site', 'publications', 'cv', 'about', 'files', 'images')
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.images = [], [], []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values:
            self.ids.append(values['id'])
        if tag in ('a', 'link') and values.get('href'):
            self.links.append(values['href'])
        if tag in ('img', 'script') and values.get('src'):
            self.links.append(values['src'])
        if tag == 'img':
            self.images.append(values)
def validate():
    paths = [ROOT / n for n in ('index.html', '404.html', 'about.html')]
    paths += [ROOT / d / 'index.html' for d in ('publications', 'cv', 'about')]
    pages = {}
    for path in paths:
        page = Page()
        page.feed(path.read_text())
        assert len(page.ids) == len(set(page.ids)), f'Duplicate ID: {path}'
        assert all(image.get('alt') for image in page.images), f'Missing image alt: {path}'
        pages[path.resolve()] = page
    for path, page in pages.items():
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            assert not url.path.startswith('/'), f'Root-relative URL breaks project Pages: {link}'
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            if target.is_dir():
                target /= 'index.html'
            assert target.is_relative_to(ROOT), f'Link leaves site: {link}'
            assert target.exists(), f'Missing local target: {path.name}: {link}'
            if url.fragment and target in pages:
                assert unquote(url.fragment) in pages[target].ids, f'Missing anchor: {link}'
    print(f'Validated {len(pages)} HTML pages and all local links, anchors, and image alt text.')
def build():
    validate()
    # Only generated output is replaced. Original Jekyll source is preserved.
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for name in FILES:
        shutil.copy2(ROOT / name, OUT / name)
    for name in DIRECTORIES:
        shutil.copytree(ROOT / name, OUT / name)
    print(f'Static site ready: {OUT}')
if __name__ == '__main__':
    build()
