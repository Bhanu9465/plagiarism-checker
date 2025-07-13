import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiUpload, 
  FiBrain, 
  FiTrendingUp, 
  FiShield,
  FiFileText,
  FiSettings,
  FiCheckCircle
} from 'react-icons/fi';
import PlagiarismForm from '../components/PlagiarismForm';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
  }
  
  &::before {
    width: 300px;
    height: 300px;
    top: 10%;
    right: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    width: 200px;
    height: 200px;
    bottom: 20%;
    left: 5%;
    animation-delay: 3s;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled(motion.section)`
  text-align: center;
  padding: 4rem 0;
  color: var(--white);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  color: var(--white);
  transition: var(--transition);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: var(--shadow-2xl);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--white);
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const FormSection = styled(motion.section)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  margin: 4rem 0;
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: var(--gray-600);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const HowItWorksSection = styled(motion.section)`
  padding: 4rem 0;
  color: var(--white);
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StepCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--primary-gradient);
    border-radius: var(--radius-xl);
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: var(--primary-gradient);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 auto 1.5rem;
  box-shadow: var(--shadow-lg);
`;

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    text: '',
    referenceType: 'academic',
    file: null
  });

  const handleFormSubmit = (data) => {
    // Navigate to result page with form data
    navigate('/result', { state: { formData: data } });
  };

  const features = [
    {
      icon: <FiUpload />,
      title: 'File Upload',
      description: 'Support for TXT, DOCX, PDF files with drag & drop'
    },
    {
      icon: <FiBrain />,
      title: 'AI Analysis',
      description: 'Advanced TF-IDF + Cosine Similarity algorithms'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Detailed Reports',
      description: 'Comprehensive similarity scores & highlights'
    },
    {
      icon: <FiShield />,
      title: 'Secure',
      description: 'Files deleted after processing for privacy'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Text Processing',
      description: 'Your text is cleaned, tokenized, and preprocessed to remove noise and standardize formatting.'
    },
    {
      number: '2',
      title: 'AI Analysis',
      description: 'Advanced TF-IDF vectorization and cosine similarity algorithms analyze text similarity.'
    },
    {
      number: '3',
      title: 'Detailed Report',
      description: 'Get comprehensive results with similarity scores, highlighted matches, and recommendations.'
    }
  ];

  return (
    <HomeContainer>
      <BackgroundShapes />
      <Content>
        <HeroSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroTitle>
            <FiSearch style={{ marginRight: '1rem' }} />
            AI-Powered Plagiarism Detection
          </HeroTitle>
          <HeroSubtitle>
            Advanced text similarity analysis using cutting-edge machine learning algorithms. 
            Get instant, accurate results with our state-of-the-art plagiarism detection system.
          </HeroSubtitle>
        </HeroSection>

        <FeatureGrid
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <FormSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>Check Your Text</SectionTitle>
          <SectionSubtitle>
            Enter your text or upload a file to get started with our advanced plagiarism detection
          </SectionSubtitle>
          <PlagiarismForm onSubmit={handleFormSubmit} />
        </FormSection>

        <HowItWorksSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle style={{ color: 'var(--white)' }}>How It Works</SectionTitle>
          <StepGrid>
            {steps.map((step, index) => (
              <StepCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <StepNumber>{step.number}</StepNumber>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </StepCard>
            ))}
          </StepGrid>
        </HowItWorksSection>
      </Content>
    </HomeContainer>
  );
};

export default Home; 