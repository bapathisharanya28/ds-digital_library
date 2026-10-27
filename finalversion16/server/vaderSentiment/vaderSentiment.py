"""Lightweight offline fallback for the vaderSentiment import API.

The launcher installs the official vaderSentiment package. This compact
lexicon-based fallback keeps review-analysis experiments runnable when that
package cannot be installed; it is not a full replacement for official VADER.
"""
import math
import re

_POSITIVE = {
    "amazing", "awesome", "beautiful", "best", "cheerful", "delightful", "excellent",
    "excited", "fantastic", "fast", "good", "great", "happy", "love", "loved",
    "nice", "perfect", "recommend", "satisfied", "superb", "terrific", "wonderful",
    "durable", "enjoy", "enjoyed", "positive", "pleased", "outstanding", "brilliant",
    "valuable", "value", "works", "like", "well", "thanks", "thank"
}
_NEGATIVE = {
    "angry", "awful", "bad", "broken", "disappointed", "disappointing", "defective",
    "dirty", "fail", "failed", "failure", "fear", "furious", "hate", "hated", "horrible",
    "lonely", "poor", "sad", "scared", "terrible", "unusable", "useless", "waste",
    "worst", "wrong", "annoying", "frustrating", "frustrated", "slow", "stopped", "problem"
}
_NEGATIONS = {"not", "never", "no", "isn't", "wasn't", "don't", "didn't", "can't", "cannot"}

class SentimentIntensityAnalyzer:
    def polarity_scores(self, text):
        tokens = re.findall(r"[a-z']+", str(text).lower())
        pos = neg = 0.0
        negate_next = False
        for token in tokens:
            if token in _NEGATIONS:
                negate_next = True
                continue
            value = 1.0 if token in _POSITIVE else (-1.0 if token in _NEGATIVE else 0.0)
            if value:
                if negate_next:
                    value *= -0.8
                if value > 0:
                    pos += value
                else:
                    neg += abs(value)
                negate_next = False
        total = pos + neg
        if total == 0:
            return {"neg": 0.0, "neu": 1.0, "pos": 0.0, "compound": 0.0}
        compound_raw = pos - neg
        compound = compound_raw / math.sqrt(compound_raw * compound_raw + 15.0)
        # Approximate proportions for the fallback; official VADER is preferred.
        return {
            "neg": round(neg / (total + max(0, len(tokens) - total)), 3),
            "neu": round(max(0.0, 1.0 - total / max(1, len(tokens))), 3),
            "pos": round(pos / (total + max(0, len(tokens) - total)), 3),
            "compound": round(compound, 4),
        }
