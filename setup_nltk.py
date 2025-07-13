#!/usr/bin/env python3
"""
Setup script to download required NLTK data
"""

import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

def download_nltk_data():
    """Download required NLTK data"""
    
    print("📥 Downloading required NLTK data...")
    
    required_packages = [
        'punkt',
        'stopwords',
        'averaged_perceptron_tagger',
        'maxent_ne_chunker',
        'words'
    ]
    
    for package in required_packages:
        try:
            print(f"Downloading {package}...")
            nltk.download(package, quiet=True)
            print(f"✅ {package} downloaded successfully")
        except Exception as e:
            print(f"❌ Error downloading {package}: {e}")
    
    print("\n🎉 NLTK setup completed!")
    print("You can now run the plagiarism checker.")

if __name__ == "__main__":
    download_nltk_data() 