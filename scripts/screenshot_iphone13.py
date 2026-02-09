from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT_DIR = Path(__file__).resolve().parent.parent / 'screenshots'
OUTPUT_DIR.mkdir(exist_ok=True)

URL = 'http://127.0.0.1:8000'
NAME = 'iphone_13-390x844.png'

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(viewport={"width": 390, "height": 844})
    page = context.new_page()
    try:
        page.goto(URL, wait_until='networkidle', timeout=15000)
    except Exception:
        page.goto(URL)
    page.wait_for_timeout(800)
    path = OUTPUT_DIR / NAME
    page.screenshot(path=str(path), full_page=True)
    print(f"Saved {path}")
    context.close()
    browser.close()
