import os
import subprocess
from PIL import Image

svg_path = "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/favicon.svg"
png_512_path = "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/android-chrome-512x512.png"

# Render 512x512 base PNG using Chrome headless
chrome_cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--user-data-dir=/tmp/chrome_profile",
    "--window-size=512,512",
    "--default-background-color=00000000",
    f"--screenshot={png_512_path}",
    f"file://{svg_path}"
]

print("Rendering 512x512 PNG via Chrome...")
subprocess.run(chrome_cmd, check=True)

# Load base image with PIL
base_img = Image.open(png_512_path).convert("RGBA")

# Generate sizes
sizes = {
    "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/favicon-16x16.png": (16, 16),
    "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/favicon-32x32.png": (32, 32),
    "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/apple-touch-icon.png": (180, 180),
    "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/android-chrome-192x192.png": (192, 192),
}

for path, size in sizes.items():
    resized = base_img.resize(size, Image.Resampling.LANCZOS)
    resized.save(path, "PNG")
    print(f"Generated {os.path.basename(path)} {size}")

# Generate multi-size favicon.ico
ico_path = "/Users/kalyan/Downloads/2026/Nov2026/Smart-Transport-Monitoring-NESFIC-D-22/public/favicon.ico"
base_img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"Generated {os.path.basename(ico_path)}")
