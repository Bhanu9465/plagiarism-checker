#!/usr/bin/env python3
"""
Simple test script for the plagiarism checker
"""

from utils.similarity import compute_similarity, get_plagiarism_level, preprocess_text

def test_similarity():
    """Test the similarity calculation functionality"""
    
    # Test case 1: Identical text
    text1 = "This is a test sentence for plagiarism detection."
    text2 = "This is a test sentence for plagiarism detection."
    
    similarity = compute_similarity(text1, text2)
    level, color = get_plagiarism_level(similarity)
    
    print(f"Test 1 - Identical text:")
    print(f"Text 1: {text1}")
    print(f"Text 2: {text2}")
    print(f"Similarity: {similarity}%")
    print(f"Level: {level}")
    print(f"Color: {color}")
    print("-" * 50)
    
    # Test case 2: Similar text
    text1 = "Academic writing is a formal style of writing used in universities."
    text2 = "Academic writing represents a formal approach to composition in educational institutions."
    
    similarity = compute_similarity(text1, text2)
    level, color = get_plagiarism_level(similarity)
    
    print(f"Test 2 - Similar text:")
    print(f"Text 1: {text1}")
    print(f"Text 2: {text2}")
    print(f"Similarity: {similarity}%")
    print(f"Level: {level}")
    print(f"Color: {color}")
    print("-" * 50)
    
    # Test case 3: Different text
    text1 = "The weather is sunny today and perfect for a picnic."
    text2 = "Machine learning algorithms can process large datasets efficiently."
    
    similarity = compute_similarity(text1, text2)
    level, color = get_plagiarism_level(similarity)
    
    print(f"Test 3 - Different text:")
    print(f"Text 1: {text1}")
    print(f"Text 2: {text2}")
    print(f"Similarity: {similarity}%")
    print(f"Level: {level}")
    print(f"Color: {color}")
    print("-" * 50)

def test_plagiarism_levels():
    """Test different similarity score levels"""
    
    test_scores = [5, 15, 45, 75, 95]
    
    print("Testing plagiarism level categorization:")
    for score in test_scores:
        level, color = get_plagiarism_level(score)
        print(f"Score: {score}% -> Level: {level} (Color: {color})")
    print("-" * 50)

if __name__ == "__main__":
    print("🧪 Testing Plagiarism Checker Components")
    print("=" * 50)
    
    try:
        test_similarity()
        test_plagiarism_levels()
        print("✅ All tests completed successfully!")
        print("\n🚀 The plagiarism checker is ready to use!")
        print("Run 'python app.py' to start the web application.")
        
    except Exception as e:
        print(f"❌ Error during testing: {e}")
        print("Please check your installation and dependencies.") 