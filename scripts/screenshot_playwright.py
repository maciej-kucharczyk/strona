from pathlib import Path
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    (320, 568, 'iphone_se'),
    (375, 667, 'iphone_8'),
    (375, 812, 'iphone_x'),
    (390, 844, 'iphone_14'),
    (428, 926, 'iphone_14_pro_max'),
    (360, 740, 'samsung_360x740'),
    (360, 780, 'samsung_360x780'),
    (360, 800, 'samsung_360x800'),
    (412, 915, 'samsung_412x915'),
    (360, 780, 'xiaomi_360x780'),
    (360, 800, 'xiaomi_360x800'),
    (393, 852, 'xiaomi_393x852'),
    (768, 1024, 'tablet_768x1024'),
    (834, 1194, 'tablet_834x1194'),
    (1024, 1366, 'tablet_1024x1366'),
]

OUTPUT_DIR = Path(__file__).resolve().parent.parent / 'screenshots'
OUTPUT_DIR.mkdir(exist_ok=True)

URL = 'http://127.0.0.1:8000'

with sync_playwright() as p:
    browser = p.chromium.launch()
    for w, h, name in VIEWPORTS:
        context = browser.new_context(viewport={"width": w, "height": h})
        page = context.new_page()
        try:
            page.goto(URL, wait_until='networkidle', timeout=15000)
        except Exception:
            page.goto(URL)
        # small delay to let fonts/backgrounds load
        page.wait_for_timeout(800)
        path = OUTPUT_DIR / f"{name}-{w}x{h}.png"
        page.screenshot(path=str(path), full_page=True)
        print(f"Saved {path}")
        context.close()
    browser.close()
