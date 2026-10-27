"""Small offline sentiment fallback used only if vaderSentiment is not installed."""
from .vaderSentiment import SentimentIntensityAnalyzer
__all__ = ["SentimentIntensityAnalyzer"]
