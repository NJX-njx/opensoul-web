import os
import numpy as np
from rembg import remove, new_session
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

def process_image():
    input_path = "girl1.png"
    output_path = "public/girl-header.webp"
    output_mobile_path = "public/girl-header-mobile.webp"

    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    print("Processing image...")
    
    # Open image
    img_orig = Image.open(input_path).convert("RGBA")
    
    # 1. Remove background using rembg (for the character)
    print("Removing background (AI model)...")
    session = new_session("u2net") 
    img_rembg = remove(img_orig, session=session)
    
    # 2. Recover Text (High luminance mask)
    print("Recovering text details...")
    gray = img_orig.convert("L")
    # Lower threshold to 150 to ensure we catch the text
    text_mask = gray.point(lambda x: 255 if x > 150 else 0, mode="1")
    # Slight blur to smooth edges
    text_mask = text_mask.convert("L").filter(ImageFilter.GaussianBlur(1))
    
    # Combine rembg alpha with text mask
    rembg_alpha = img_rembg.split()[3]
    combined_alpha = np.maximum(np.array(rembg_alpha), np.array(text_mask))
    final_alpha = Image.fromarray(combined_alpha)
    
    # Create intermediate image with correct alpha
    img_masked = img_orig.copy()
    img_masked.putalpha(final_alpha)
    
    # 3. Add Strong White Stroke/Glow
    print("Adding strong edge glow...")
    # Use MaxFilter to dilate the mask (create a solid outline)
    # Size 5 means roughly 2-3px expansion in all directions
    dilated_mask = final_alpha.filter(ImageFilter.MaxFilter(5))
    
    # Blur the dilated mask slightly for a glowing effect
    glow_mask = dilated_mask.filter(ImageFilter.GaussianBlur(3))
    
    # Create a solid white layer for the glow
    glow_layer = Image.new("RGBA", img_masked.size, (255, 255, 255, 255))
    glow_layer.putalpha(glow_mask)
    
    # Composite: Glow behind Image
    canvas = Image.new("RGBA", img_masked.size, (0,0,0,0))
    canvas.paste(glow_layer, (0,0), glow_layer)
    canvas.paste(img_masked, (0,0), img_masked)
    img_final = canvas

    # 4. Color Correction
    print("Applying color correction...")
    enhancer = ImageEnhance.Contrast(img_final)
    img_final = enhancer.enhance(1.1)
    enhancer = ImageEnhance.Sharpness(img_final)
    img_final = enhancer.enhance(1.2)

    # 5. Resize / Output
    desktop_width = 1000
    w_percent = (desktop_width / float(img_final.size[0]))
    h_size = int((float(img_final.size[1]) * float(w_percent)))
    img_desktop = img_final.resize((desktop_width, h_size), Image.Resampling.LANCZOS)
    
    print(f"Saving {output_path}...")
    img_desktop.save(output_path, format="WEBP", quality=90, method=6)
    
    mobile_width = 500
    w_percent_m = (mobile_width / float(img_final.size[0]))
    h_size_m = int((float(img_final.size[1]) * float(w_percent_m)))
    img_mobile = img_final.resize((mobile_width, h_size_m), Image.Resampling.LANCZOS)
    
    print(f"Saving {output_mobile_path}...")
    img_mobile.save(output_mobile_path, format="WEBP", quality=85, method=6)
    
    print("Done.")

if __name__ == "__main__":
    process_image()
