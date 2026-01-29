import faiss
import pickle
import numpy as np
import os
from pymongo import MongoClient

# --- MongoDB client ---
db = MongoClient(os.getenv('MONGODB_URL', 'mongodb://mongo:27017')).upskaleai

# --- FAISS Index variables ---
_index = None
_id_map = []

# --- Paths for saving index and metadata ---
INDEX_PATH = os.getenv('FAISS_INDEX_PATH', 'faiss.index')
META_PATH = os.getenv('FAISS_META_PATH', 'meta.pkl')


def init_index(dim: int):
    """
    Initialize the FAISS index with given dimension.
    """
    global _index
    if os.path.exists(INDEX_PATH):
        _index = faiss.read_index(INDEX_PATH)
        load_meta()
    else:
        _index = faiss.IndexFlatIP(dim)
        save_index()
        save_meta()


def save_index():
    global _index
    if _index is not None:
        faiss.write_index(_index, INDEX_PATH)


def save_meta():
    with open(META_PATH, 'wb') as f:
        pickle.dump(_id_map, f)


def load_meta():
    global _id_map
    if os.path.exists(META_PATH):
        with open(META_PATH, 'rb') as f:
            _id_map = pickle.load(f)
    else:
        _id_map = []


def upsert(id_str: str, embedding: np.ndarray, metadata: dict = None):
    """
    Insert a new vector into FAISS index and update MongoDB.
    """
    global _index, _id_map
    if _index is None:
        raise RuntimeError('Index not initialized')

    v = np.array(embedding, dtype='float32')
    norm = np.linalg.norm(v)
    if norm == 0:
        return
    v = (v / norm).reshape(1, -1)

    _index.add(v)
    _id_map.append(id_str)

    db.vectors.update_one({'_id': id_str}, {'$set': {'metadata': metadata}}, upsert=True)
    save_index()
    save_meta()


def delete(id_str: str):
    """
    Soft delete a vector by marking it as deleted in MongoDB.
    """
    db.vectors.update_one({'_id': id_str}, {'$set': {'deleted': True}})


def query(embedding: np.ndarray, top_k: int = 10):
    """
    Query top_k most similar vectors from FAISS.
    """
    if _index is None:
        raise RuntimeError('Index not initialized')

    v = np.array(embedding, dtype='float32')
    norm = np.linalg.norm(v)
    if norm == 0:
        return []

    v = (v / norm).reshape(1, -1)
    D, I = _index.search(v, top_k)
    results = []

    for score, idx in zip(D[0], I[0]):
        if idx < 0 or idx >= len(_id_map):
            continue
        id_str = _id_map[idx]
        meta_doc = db.vectors.find_one({'_id': id_str})
        if meta_doc and meta_doc.get('deleted'):
            continue
        results.append({
            'id': id_str,
            'score': float(score),
            'metadata': meta_doc.get('metadata') if meta_doc else None
        })

    return results
