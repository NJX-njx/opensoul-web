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
    # Use u2net_human_seg or u2net for better character details if needed, 
    # but standard u2net is usually good.
    session = new_session("u2net") 
    img_rembg = remove(img_orig, session=session)
    
    # 2. Recover Text (High luminance mask)
    # The text "opensoul" is likely white or very bright. 
    # rembg might miss it or treat it as background.
    print("Recovering text details...")
    # Convert original to grayscale
    gray = img_orig.convert("L")
    # Create a mask for bright pixels (Threshold > 200)
    # This helps recover the white text "opensoul" if lost
    text_mask = gray.point(lambda x: 255 if x > 200 else 0, mode="1")
    # Blur the text mask slightly to avoid jagged edges
    text_mask = text_mask.convert("L").filter(ImageFilter.GaussianBlur(1))
    
    # Combine rembg alpha with text mask
    # We want to keep pixels that are either in rembg OR are bright (text)
    rembg_alpha = img_rembg.split()[3]
    
    # Combine masks: Maximum of the two
    combined_alpha = np.maximum(np.array(rembg_alpha), np.array(text_mask))
    final_alpha = Image.fromarray(combined_alpha)
    
    # Create final composite
    img_final = img_orig.copy()
    img_final.putalpha(final_alpha)
    
    # 3. Add Light Stroke / Glow (to separate from background)
    print("Adding edge glow...")
    # Create a mask for the outline
    mask = final_alpha.copy()
    # Dilate the mask to create a slightly larger shape
    # Since PIL doesn't have morphological dilate easily for this, use filter
    # Simple trick: repeated max filter or gaussian blur + threshold
    stroke_size = 2 # px
    
    # Create a white canvas for the glow
    glow_layer = Image.new("RGBA", img_final.size, (255, 255, 255, 0))
    glow_mask = mask.filter(ImageFilter.GaussianBlur(stroke_size))
    # Boost the blur alpha to make it solid-ish
    glow_mask_np = np.array(glow_mask)
    glow_mask_np = np.clip(glow_mask_np * 3.0, 0, 255).astype(np.uint8)
    glow_layer.putalpha(Image.fromarray(glow_mask_np))
    
    # Composite: Glow behind Image
    # Since we want the stroke *around* the character, we put glow_layer behind
    canvas = Image.new("RGBA", img_final.size, (0,0,0,0))
    canvas.paste(glow_layer, (0,0), glow_layer)
    canvas.paste(img_final, (0,0), img_final)
    img_final = canvas

    # 4. Color Correction
    print("Applying color correction...")
    enhancer = ImageEnhance.Contrast(img_final)
    img_final = enhancer.enhance(1.1)
    enhancer = ImageEnhance.Sharpness(img_final)
    img_final = enhancer.enhance(1.2)

    # 5. Resize / Output
    # User requested 15-20% enlargement of subject. 
    # We will output slightly larger dimensions to allow CSS to scale it up without blur.
    
    desktop_width = 1000 # Increased from 800
    w_percent = (desktop_width / float(img_final.size[0]))
    h_size = int((float(img_final.size[1]) * float(w_percent)))
    img_desktop = img_final.resize((desktop_width, h_size), Image.Resampling.LANCZOS)
    
    print(f"Saving {output_path}...")
    img_desktop.save(output_path, format="WEBP", quality=90, method=6)
    
    mobile_width = 500 # Increased from 400
    w_percent_m = (mobile_width / float(img_final.size[0]))
    h_size_m = int((float(img_final.size[1]) * float(w_percent_m)))
    img_mobile = img_final.resize((mobile_width, h_size_m), Image.Resampling.LANCZOS)
    
    print(f"Saving {output_mobile_path}...")
    img_mobile.save(output_mobile_path, format="WEBP", quality=85, method=6)
    
    print("Done.")

if __name__ == "__main__":
    process_image()
