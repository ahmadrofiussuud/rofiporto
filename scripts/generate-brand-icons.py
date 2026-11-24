"""Render the portfolio's geometric M mark as ICO and Apple icon assets."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
scale = 16
image = Image.new('RGBA', (64*scale, 64*scale), '#1d222a')
draw = ImageDraw.Draw(image)
points = [(11,47),(11,17),(20,17),(31,33),(42,17),(51,17),(51,47),(42,47),(42,32),(31,47),(20,32),(20,47)]
draw.polygon([(x*scale,y*scale) for x,y in points], fill='#fbfaf9')
draw.ellipse((49*scale,48*scale,58*scale,57*scale),fill='#264bc5')
image.resize((256,256),Image.Resampling.LANCZOS).save(root/'src/app/favicon.ico',sizes=[(16,16),(32,32),(48,48),(64,64),(256,256)])
image.resize((180,180),Image.Resampling.LANCZOS).save(root/'src/app/apple-icon.png')
print('Rendered MARS monogram ICO and Apple icon.')
