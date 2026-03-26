import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "pillow.png": "https://e-energyusa.com/cdn/shop/products/ALM_HIVE_DREAM.png",
    "bracelet.png": "https://e-energyusa.com/cdn/shop/files/B_B_C_D3.png",
    "wellness-kit.png": "https://e-energyusa.com/cdn/shop/files/A08_2.png",
    "squeeze.png": "https://e-energyusa.com/cdn/shop/files/479531477_1062914932542711_7063650615866743898_n_png.jpg",
    "mattress.png": "https://e-energyusa.com/cdn/shop/files/TSF.png"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

for filename, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response, open(filename, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
