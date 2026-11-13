import os
from PIL import Image

images_to_optimize = [
    # imgs_coworking
    "app/public/images/imgs_coworking/recepcao.png",
    "app/public/images/imgs_coworking/Estações de trabalho.png",
    "app/public/images/imgs_coworking/Estações de trabalho 1.png",
    "app/public/images/imgs_coworking/Estações de trabalho 2.png",
    "app/public/images/imgs_coworking/Auditório com cadeiras.png",
    "app/public/images/imgs_coworking/Auditório com mesas.png",
    "app/public/images/imgs_coworking/Balcao.jpg",
    "app/public/images/imgs_coworking/Honest Mkt.jpg",
    "app/public/images/imgs_coworking/mesa.jpg",
    "app/public/images/imgs_coworking/xicaras.jpg",
    # coworking
    "app/public/images/coworking/sala1_Vista2.jpg",
    "app/public/images/coworking/Sala2.jpg",
    "app/public/images/coworking/Mesa_grande.jpg",
    "app/public/images/coworking/Honest Mkt.jpg",
    "app/public/images/coworking/lounge2.png",
    "app/public/images/coworking/Pickup.jpg",
]

total_original_size = 0
total_new_size = 0

for img_path in images_to_optimize:
    if not os.path.exists(img_path):
        print(f"Skipping (not found): {img_path}")
        continue
    
    orig_size = os.path.getsize(img_path)
    total_original_size += orig_size
    
    dir_name = os.path.dirname(img_path)
    base_name = os.path.splitext(os.path.basename(img_path))[0]
    out_path = os.path.join(dir_name, f"{base_name}.webp")
    
    with Image.open(img_path) as im:
        im = im.convert("RGB")
        max_dim = 1600
        w, h = im.size
        if max(w, h) > max_dim:
            if w > h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        im.save(out_path, "WEBP", quality=82, method=6)
        new_size = os.path.getsize(out_path)
        total_new_size += new_size
        print(f"Converted {img_path} -> {out_path} ({orig_size / 1024 / 1024:.2f} MB -> {new_size / 1024:.1f} KB)")

# Also create hero poster from recepcao or mesa
hero_src = "app/public/images/imgs_coworking/recepcao.png"
if os.path.exists(hero_src):
    hero_poster = "app/public/images/imgs_coworking/hero-poster.webp"
    with Image.open(hero_src) as im:
        im = im.convert("RGB")
        w, h = im.size
        max_dim = 1600
        if max(w, h) > max_dim:
            new_w = max_dim
            new_h = int(h * (max_dim / w))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        im.save(hero_poster, "WEBP", quality=80, method=6)
        print(f"Created hero poster: {hero_poster} ({os.path.getsize(hero_poster) / 1024:.1f} KB)")

print(f"\nTotal reduction: {total_original_size / 1024 / 1024:.2f} MB -> {total_new_size / 1024 / 1024:.2f} MB (saved {(total_original_size - total_new_size) / 1024 / 1024:.2f} MB!)")
