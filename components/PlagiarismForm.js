import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  FiUpload, 
  FiFileText, 
  FiX, 
  FiSearch,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--gray-700);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  background: var(--white);
  transition: var(--transition);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &:hover {
    border-color: var(--gray-300);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 200px;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &:hover {
    border-color: var(--gray-300);
  }
  
  &::placeholder {
    color: var(--gray-400);
  }
`;

const WordCount = styled.div`
  font-size: 0.875rem;
  color: var(--gray-500);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.warning {
    color: var(--warning);
  }
  
  &.error {
    color: var(--danger);
  }
`;

const DropzoneContainer = styled.div`
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  background: var(--gray-50);
  transition: var(--transition);
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    background: var(--gray-100);
  }
  
  &.drag-active {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.05);
  }
  
  &.has-file {
    border-color: var(--success);
    background: rgba(16, 185, 129, 0.05);
  }
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  svg {
    font-size: 3rem;
    color: var(--gray-400);
  }
  
  .drag-active & svg {
    color: var(--primary);
  }
  
  .has-file & svg {
    color: var(--success);
  }
`;

const DropzoneText = styled.div`
  color: var(--gray-600);
  font-weight: 500;
  
  .drag-active & {
    color: var(--primary);
  }
  
  .has-file & {
    color: var(--success);
  }
`;

const DropzoneSubtext = styled.div`
  font-size: 0.875rem;
  color: var(--gray-500);
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--success);
  color: var(--white);
  padding: 1rem;
  border-radius: var(--radius);
  margin-top: 1rem;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--primary-gradient);
  color: var(--white);
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: var(--shadow-lg);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const PlagiarismForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    text: '',
    referenceType: 'academic',
    file: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ file: 'File size too large. Maximum size is 10MB.' });
        return;
      }
      
      // Check file type
      const allowedTypes = ['.txt', '.docx', '.pdf'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        setErrors({ file: 'Invalid file type. Please upload .txt, .docx, or .pdf files only.' });
        return;
      }
      
      setFormData(prev => ({ ...prev, file, text: '' }));
      setErrors({});
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const handleTextChange = (e) => {
    const text = e.target.value;
    setFormData(prev => ({ ...prev, text, file: null }));
    setErrors({});
  };

  const handleReferenceTypeChange = (e) => {
    setFormData(prev => ({ ...prev, referenceType: e.target.value }));
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.text && !formData.file) {
      newErrors.general = 'Please provide text input or upload a file.';
    }
    
    if (formData.text && formData.text.trim().split(/\s+/).length > 10000) {
      newErrors.text = 'Text is too long. Maximum 10,000 words allowed.';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit(formData);
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = formData.text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isTextTooLong = wordCount > 10000;

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <FiFileText />
            Reference Category
          </Label>
          <Select 
            value={formData.referenceType} 
            onChange={handleReferenceTypeChange}
          >
            <option value="academic">Academic Writing</option>
            <option value="creative">Creative Writing</option>
            <option value="technical">Technical Writing</option>
            <option value="business">Business Writing</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <FiFileText />
            Enter Your Text
          </Label>
          <TextArea
            value={formData.text}
            onChange={handleTextChange}
            placeholder="Paste your text here or upload a file below..."
            disabled={!!formData.file}
          />
          <WordCount className={isTextTooLong ? 'error' : wordCount > 8000 ? 'warning' : ''}>
            {isTextTooLong ? (
              <>
                <FiAlertCircle />
                {wordCount} words (Maximum 10,000 words)
              </>
            ) : (
              <>
                <FiCheckCircle />
                {wordCount} words
              </>
            )}
          </WordCount>
          {errors.text && <ErrorMessage><FiAlertCircle />{errors.text}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            <FiUpload />
            Or Upload a File
          </Label>
          <DropzoneContainer
            {...getRootProps()}
            className={`${isDragActive ? 'drag-active' : ''} ${formData.file ? 'has-file' : ''}`}
          >
            <input {...getInputProps()} />
            <DropzoneContent>
              <FiUpload />
              <DropzoneText>
                {formData.file 
                  ? 'File uploaded successfully!' 
                  : isDragActive 
                    ? 'Drop the file here...' 
                    : 'Drag & drop a file here, or click to select'
                }
              </DropzoneText>
              <DropzoneSubtext>
                Supported formats: TXT, DOCX, PDF (Max 10MB)
              </DropzoneSubtext>
            </DropzoneContent>
          </DropzoneContainer>
          
          {formData.file && (
            <FileInfo>
              <FileDetails>
                <FiCheckCircle />
                {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
              </FileDetails>
              <RemoveFileButton onClick={removeFile}>
                <FiX />
              </RemoveFileButton>
            </FileInfo>
          )}
          
          {errors.file && <ErrorMessage><FiAlertCircle />{errors.file}</ErrorMessage>}
        </FormGroup>

        {errors.general && (
          <ErrorMessage><FiAlertCircle />{errors.general}</ErrorMessage>
        )}

        <SubmitButton
          type="submit"
          disabled={isSubmitting || isTextTooLong || (!formData.text && !formData.file)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              Analyzing...
            </>
          ) : (
            <>
              <FiSearch />
              Check for Plagiarism
            </>
          )}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default PlagiarismForm; 