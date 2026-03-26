import urllib.request
from bs4 import BeautifulSoup
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    'pillow': 'https://e-energyusa.com/es/products/alcaline-max-refill', 
    # ^ wait, the URL 'https://e-energyusa.com/es/collections/pillows' might not pinpoint the pillow image perfectly.
    # The subagent got 'ALM_HIVE_DREAM.png'.
    'bracelet': 'https://e-energyusa.com/products/copy-of-bracelet-fir-ion-black',
    'kit': 'https://e-energyusa.com/products/wellness-kit-premium-02'
}

results = {}
for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx).read()
        soup = BeautifulSoup(html, 'html.parser')
        imgs = [img.get('src') for img in soup.find_all('img') if img.get('src') and 'cdn/shop' in img.get('src')]
        # Favor images with tokens like .png?v=
        best = next((img for img in imgs if '.png?v=' in img or '.jpg?v=' in img), imgs[0] if imgs else '')
        results[name] = "https:" + best if best.startswith('//') else best
    except Exception as e:
        results[name] = str(e)

with open('image_links.json', 'w') as f:
    json.dump(results, f, indent=2)
