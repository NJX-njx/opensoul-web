import os
import glob
from PIL import Image, ImageOps, ImageEnhance

def process_feature_images():
    # Configuration
    target_ratio = 4/3  # 4:3 Aspect Ratio
    target_width = 800  # High res for retina
    target_height = int(target_width / target_ratio)
    
    images = [
        {"src": "girl2.jpg", "dest": "public/feature-1.webp"},
        {"src": "girl3.jpg", "dest": "public/feature-2.webp"},
        {"src": "girl4.jpg", "dest": "public/feature-3.webp"},
    ]

    for img_config in images:
        if not os.path.exists(img_config["src"]):
            print(f"Warning: {img_config['src']} not found, skipping.")
            continue
            
        print(f"Processing {img_config['src']}...")
        
        try:
            with Image.open(img_config["src"]) as img:
                # Convert to RGB (in case of RGBA/P modes)
                img = img.convert("RGB")
                
                # 1. Center Crop to Target Ratio
                img_ratio = img.width / img.height
                if img_ratio > target_ratio:
                    # Too wide, crop width
                    new_width = int(img.height * target_ratio)
                    offset = (img.width - new_width) // 2
                    img = img.crop((offset, 0, offset + new_width, img.height))
                else:
                    # Too tall, crop height
                    new_height = int(img.width / target_ratio)
                    offset = (img.height - new_height) // 2
                    img = img.crop((0, offset, img.width, offset + new_height))
                
                # 2. Resize to Target Dimensions
                img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
                
                # 3. Enhance (Optional, slight sharpness for crispness)
                enhancer = ImageEnhance.Sharpness(img)
                img = enhancer.enhance(1.1)
                
                # 4. Save as WebP
                img.save(img_config["dest"], "WEBP", quality=85)
                print(f"Saved {img_config['dest']}")
                
        except Exception as e:
            print(f"Error processing {img_config['src']}: {e}")

if __name__ == "__main__":
    process_feature_images()
