"""
Fallback pure-Python WordCloud implementation using PIL and matplotlib.
Enables wordcloud generation on systems where C++ build tools are not installed.
"""

from PIL import Image, ImageDraw, ImageFont
import numpy as np
import collections
import random
import re

class WordCloud:
    def __init__(self, width=1200, height=600, background_color="white", max_words=150, collocations=False):
        self.width = int(width)
        self.height = int(height)
        self.background_color = background_color
        self.max_words = int(max_words)
        self.collocations = collocations
        self.image = None

    def generate(self, text):
        raw_words = re.findall(r"\b[A-Za-z]{3,}\b", text.lower())
        stopwords_set = {
            "the", "and", "is", "for", "with", "this", "that", "was", "are", "have", "has",
            "from", "but", "not", "they", "you", "all", "can", "out", "about", "product", "item"
        }
        filtered = [w for w in raw_words if w not in stopwords_set]
        counts = collections.Counter(filtered).most_common(self.max_words)
        
        bg_rgb = (255, 255, 255) if self.background_color.lower() in ["white", "#fff", "#ffffff"] else (15, 15, 20)
        img = Image.new("RGB", (self.width, self.height), color=bg_rgb)
        draw = ImageDraw.Draw(img)

        colors = [
            (31, 119, 180), (255, 127, 14), (44, 160, 44), (214, 39, 40),
            (148, 103, 189), (140, 86, 75), (227, 119, 194), (188, 189, 34),
            (23, 190, 207), (106, 27, 154), (0, 105, 92), (230, 81, 0)
        ]

        if not counts:
            self.image = np.array(img)
            return self

        max_count = counts[0][1] if counts else 1
        cols = 5
        rows = int(np.ceil(len(counts) / cols)) if counts else 1
        cell_w = self.width / cols
        cell_h = self.height / max(1, rows)

        random.seed(42)
        for idx, (word, count) in enumerate(counts):
            font_size = int(16 + 42 * (count / max_count))
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except Exception:
                try:
                    font = ImageFont.truetype("DejaVuSans.ttf", font_size)
                except Exception:
                    font = ImageFont.load_default()

            c_idx = idx % cols
            r_idx = idx // cols
            x = int(c_idx * cell_w + 15 + (idx % 3) * 10)
            y = int(r_idx * cell_h + 10 + (idx % 2) * 5)
            color = colors[idx % len(colors)]
            draw.text((x, y), word, fill=color, font=font)

        self.image = np.array(img)
        return self

    def to_file(self, filename):
        if self.image is not None:
            Image.fromarray(self.image).save(filename)

    def to_array(self):
        return self.image

    def __array__(self):
        return self.image
