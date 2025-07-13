from docx import Document
import PyPDF2
import os
import io

def read_docx(file_path):
    """Read text from a .docx file."""
    try:
        doc = Document(file_path)
        text = []
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text.append(paragraph.text)
        return "\n".join(text)
    except Exception as e:
        print(f"Error reading DOCX file: {e}")
        return ""

def read_txt(file_path):
    """Read text from a .txt file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as file:
                return file.read()
        except Exception as e:
            print(f"Error reading TXT file: {e}")
            return ""
    except Exception as e:
        print(f"Error reading TXT file: {e}")
        return ""

def read_pdf(file_path):
    """Read text from a .pdf file."""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = []
            for page in pdf_reader.pages:
                text.append(page.extract_text())
            return "\n".join(text)
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        return ""

def read_file(file_path):
    """Read text from various file formats based on extension."""
    if not os.path.exists(file_path):
        return ""
    
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == '.docx':
        return read_docx(file_path)
    elif file_extension == '.txt':
        return read_txt(file_path)
    elif file_extension == '.pdf':
        return read_pdf(file_path)
    else:
        print(f"Unsupported file format: {file_extension}")
        return ""

def is_valid_file(file):
    """Check if uploaded file is valid and supported."""
    if not file or file.filename == '':
        return False
    
    allowed_extensions = {'.txt', '.docx', '.pdf'}
    file_extension = os.path.splitext(file.filename)[1].lower()
    
    return file_extension in allowed_extensions

def get_file_size_mb(file_path):
    """Get file size in megabytes."""
    try:
        size_bytes = os.path.getsize(file_path)
        size_mb = size_bytes / (1024 * 1024)
        return round(size_mb, 2)
    except:
        return 0 