import os
import sys
from PIL import Image, ImageChops
from rembg import remove
import io

# Configuration
CROP_MODE = "upper-body"
Y_BIAS = -0.08  # Shift subject up slightly (-0.1 to 0.1)
TARGET_SIZE = 1200

def make_profile(input_path, output_path, size=TARGET_SIZE):
    print(f"Processing: {input_path}")
    
    # 1. Load Image
    with open(input_path, 'rb') as f:
        input_image = f.read()
    
    # 2. Remove Background
    print("Removing background...")
    output_image_data = remove(input_image)
    subject = Image.open(io.BytesIO(output_image_data)).convert("RGBA")
    
    # 3. Auto-crop based on bounding box
    bbox = subject.getbbox()
    if not bbox:
        print("Error: No subject found after background removal.")
        return
        
    subject = subject.crop(bbox)
    w, h = subject.size
    
    # 4. Refined Cropping logic (Focus on Head + Upper Body)
    if CROP_MODE == "upper-body":
        # Strategy: We assume the head is near the top of the bbox.
        # We want to keep about 60-70% of the upper part of the original bbox 
        # to ensure we capture the head and upper chest/shoulders.
        new_h = int(h * 0.45) # Take 45% of the total height from top (Tighter Headshot)
        subject = subject.crop((0, 0, w, new_h))
        w, h = subject.size

    # 5. Create square canvas
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    
    # 6. Resize subject to fit gracefully
    # Target height should be about 85% of canvas for "upper-body" to look good in circle
    target_h = int(size * 0.85)
    ratio = target_h / h
    target_w = int(w * ratio)
    
    # Ensure it's not wider than canvas
    if target_w > size * 0.95:
        ratio = (size * 0.95) / w
        target_w = int(w * ratio)
        target_h = int(h * ratio)
        
    subject = subject.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 7. Paste to center with Y_BIAS
    x = (size - target_w) // 2
    y = (size - target_h) // 2 + int(size * Y_BIAS)
    
    # Clamp y to ensure head isn't cut off at the very top
    y = max(0, y)
    
    canvas.paste(subject, (x, y), subject)
    
    # 8. Export
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas.save(output_path, "PNG", optimize=True)
    
    # Save WebP version
    webp_path = os.path.splitext(output_path)[0] + ".webp"
    canvas.save(webp_path, "WEBP", quality=85)
    
    print(f"Saved: {output_path}")
    print(f"Saved: {webp_path}")

if __name__ == "__main__":
    # Default paths
    project_root = os.getcwd()
    input_file = os.path.join(project_root, "public", "images", "zhero", "hero.jpg")
    output_file = os.path.join(project_root, "public", "images", "profile", "profile.png")
    
    if not os.path.exists(input_file):
        print(f"Error: Input file not found at {input_file}")
        sys.exit(1)
        
    make_profile(input_file, output_file)
    print("Done!")
