from flask import Flask, request, jsonify
import torch
from flask_cors import CORS
import json
import numpy as np
import pandas as pd
import nltk
import string
import os
from dotenv import load_dotenv
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from gensim.models import Word2Vec
from pinecone import Pinecone, ServerlessSpec
from scipy.spatial.distance import cosine

# ✅ Load environment variables
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

app = Flask(__name__)
CORS(app)


nltk.download('punkt')
nltk.download("stopwords")
nltk.download('wordnet')
nltk.download('punkt_tab')

stopWords = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()


word2vecModel = Word2Vec.load("word2vec_product_model.model")


pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "product-index"
index = pc.Index(index_name)


def preprocessText(text):
    words = word_tokenize(text.lower())  
    words = [lemmatizer.lemmatize(word) for word in words if word not in stopWords and word not in string.punctuation]
    return words


def get_query_embedding(query, model):
    words = preprocessText(query)
    word_vectors = [model.wv[word] for word in words if word in model.wv]

    if word_vectors:
        return np.mean(word_vectors, axis=0)
    else:
        return np.zeros(model.vector_size)


def generate_response(prompt):
    query_embedding = get_query_embedding(prompt, word2vecModel)

    search_results = index.query(
        namespace="product-namespace",
        vector=query_embedding.tolist(),
        top_k=5,
        include_metadata=True
    )

    results = []
    for match in search_results["matches"]:
        results.append({
            "ProductID": match['id'],
            "Price": match['metadata']['UnitPrice'],
            "Name": match['metadata']['Name'],
            "Rating": match['metadata']['AvgRating']
        })

    return results


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    response = generate_response(prompt)
    return jsonify({"response": response})

# ✅ Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
