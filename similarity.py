from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

def preprocess_text(text):
    """Clean and preprocess text for better similarity analysis."""
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and extra whitespace
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text)
    filtered_words = [word for word in words if word not in stop_words and len(word) > 2]
    
    return ' '.join(filtered_words)

def compute_similarity(text1, text2):
    """Calculate similarity between two texts using TF-IDF and cosine similarity."""
    if not text1.strip() or not text2.strip():
        return 0.0
    
    # Preprocess both texts
    processed_text1 = preprocess_text(text1)
    processed_text2 = preprocess_text(text2)
    
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), max_features=1000)
    
    try:
        tfidf_matrix = vectorizer.fit_transform([processed_text1, processed_text2])
        similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)
        similarity_score = similarity_matrix[0][1]
        
        return round(similarity_score * 100, 2)
    except Exception as e:
        print(f"Error computing similarity: {e}")
        return 0.0

def find_similar_sentences(text1, text2, threshold=0.3):
    """Find sentences that are similar between two texts."""
    sentences1 = sent_tokenize(text1)
    sentences2 = sent_tokenize(text2)
    
    similar_sentences = []
    
    for i, sent1 in enumerate(sentences1):
        for j, sent2 in enumerate(sentences2):
            similarity = compute_similarity(sent1, sent2)
            if similarity > threshold * 100:  # Convert threshold to percentage
                similar_sentences.append({
                    'sentence1': sent1,
                    'sentence2': sent2,
                    'similarity': similarity,
                    'index1': i,
                    'index2': j
                })
    
    return similar_sentences

def get_plagiarism_level(similarity_score):
    """Categorize plagiarism level based on similarity score."""
    if similarity_score < 10:
        return "Original", "green"
    elif similarity_score < 30:
        return "Low Similarity", "yellow"
    elif similarity_score < 60:
        return "Moderate Similarity", "orange"
    elif similarity_score < 80:
        return "High Similarity", "red"
    else:
        return "Potential Plagiarism", "darkred" 