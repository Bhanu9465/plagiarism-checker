from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from utils.similarity import compute_similarity, find_similar_sentences, get_plagiarism_level
from utils.file_handler import read_file, is_valid_file, get_file_size_mb
import os
import uuid
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

# Configuration
UPLOAD_FOLDER = 'uploads'
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'txt', 'docx', 'pdf'}

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Sample reference texts for demonstration
REFERENCE_TEXTS = {
    'academic': """Academic writing is a formal style of writing used in universities and scholarly publications. 
    It features complex sentences, formal vocabulary, and a logical structure. Academic writing aims to inform, 
    analyze, and persuade through evidence-based arguments. It requires proper citation and follows specific 
    formatting guidelines.""",
    
    'creative': """Creative writing is an art form that allows writers to express their imagination and emotions. 
    It includes various genres such as poetry, fiction, drama, and creative nonfiction. Creative writers use 
    literary devices like metaphor, simile, and imagery to create vivid and engaging narratives that resonate 
    with readers on an emotional level.""",
    
    'technical': """Technical writing is a specialized form of communication that conveys complex information 
    in a clear and accessible manner. It is used in fields such as engineering, science, and technology to 
    document processes, procedures, and specifications. Technical writers must consider their audience's 
    knowledge level and provide accurate, concise information.""",
    
    'business': """Business writing is a professional communication style used in corporate environments. 
    It includes emails, reports, proposals, and presentations. Effective business writing is clear, concise, 
    and action-oriented. It should convey information efficiently while maintaining a professional tone 
    and addressing the needs of stakeholders."""
}

@app.route('/')
def index():
    return render_template('index.html', reference_texts=REFERENCE_TEXTS)

@app.route('/check', methods=['POST'])
def check_plagiarism():
    try:
        # Get form data
        text_input = request.form.get('text1', '').strip()
        reference_type = request.form.get('reference_type', 'academic')
        file = request.files.get('file1')
        
        # Validate input
        if not text_input and not file:
            flash('Please provide text input or upload a file.', 'error')
            return redirect(url_for('index'))
        
        # Handle file upload
        if file and file.filename:
            if not is_valid_file(file):
                flash('Invalid file format. Please upload .txt, .docx, or .pdf files only.', 'error')
                return redirect(url_for('index'))
            
            # Check file size
            file.seek(0, 2)  # Seek to end
            file_size = file.tell()
            file.seek(0)  # Reset to beginning
            
            if file_size > MAX_FILE_SIZE:
                flash('File size too large. Maximum size is 10MB.', 'error')
                return redirect(url_for('index'))
            
            # Save and read file
            filename = f"{uuid.uuid4()}_{file.filename}"
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            
            text_input = read_file(file_path)
            
            # Clean up file after reading
            try:
                os.remove(file_path)
            except:
                pass
        
        # Get reference text
        reference_text = REFERENCE_TEXTS.get(reference_type, REFERENCE_TEXTS['academic'])
        
        # Calculate similarity
        similarity_score = compute_similarity(text_input, reference_text)
        plagiarism_level, color = get_plagiarism_level(similarity_score)
        
        # Find similar sentences
        similar_sentences = find_similar_sentences(text_input, reference_text, threshold=0.3)
        
        # Prepare result data
        result_data = {
            'similarity_score': similarity_score,
            'plagiarism_level': plagiarism_level,
            'color': color,
            'input_text': text_input,
            'reference_text': reference_text,
            'reference_type': reference_type,
            'similar_sentences': similar_sentences,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'word_count': len(text_input.split())
        }
        
        return render_template('result.html', **result_data)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'error')
        return redirect(url_for('index'))

@app.route('/api/check', methods=['POST'])
def api_check():
    """API endpoint for programmatic access."""
    try:
        data = request.get_json()
        text1 = data.get('text1', '')
        text2 = data.get('text2', '')
        
        if not text1 or not text2:
            return jsonify({'error': 'Both text1 and text2 are required'}), 400
        
        similarity = compute_similarity(text1, text2)
        plagiarism_level, color = get_plagiarism_level(similarity)
        
        return jsonify({
            'similarity_score': similarity,
            'plagiarism_level': plagiarism_level,
            'color': color
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/about')
def about():
    return render_template('about.html')

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 