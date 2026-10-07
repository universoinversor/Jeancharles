import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "pillow.png": "https://e-energyusa.com/cdn/shop/files/WhatsApp_Image_2025-11-26_at_14.53.03_d70af48a.jpg?v=1764186853",
    "bracelet.png": "https://e-energyusa.com/cdn/shop/files/359085713_670051741829034_2806861226433582955_n.jpg?v=1696538721&width=1080",
    "wellness-kit.png": "https://e-energyusa.com/cdn/shop/files/13_aedcc70e-0c79-4897-a962-f24e8f02fa5c.jpg?v=1754398145&width=416"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

for filename, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(filename, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
