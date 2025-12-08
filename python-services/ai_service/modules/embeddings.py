from sentence_transformers import SentenceTransformer
import os

MODEL_NAME = os.getenv('EMBEDDING_MODEL', 'all-MiniLM-L6-v2')
_model = None


def get_model():
    """
    Returns a singleton SentenceTransformer model.
    """
    global _model
    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)
    return _model


def embed_texts(texts):
    """
    Return list of embeddings for a list of texts.
    """
    model = get_model()
    emb = model.encode(texts, show_progress_bar=False, convert_to_numpy=True)
    return emb


def embed_text(text):
    """
    Return embedding for a single text.
    """
    return embed_texts([text])[0]
