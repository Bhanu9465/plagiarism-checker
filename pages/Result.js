import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiPrinter, 
  FiFileText, 
  FiAlertTriangle, 
  FiShield,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiInfo
} from 'react-icons/fi';

const ResultContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  color: var(--white);
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Timestamp = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SimilarityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
`;

const SimilarityCircle = styled(motion.div)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: conic-gradient(${props => props.color} ${props => props.percentage}%, var(--gray-200) 0%);
  
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: var(--white);
    border-radius: 50%;
  }
`;

const ScoreContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ScoreNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: ${props => props.color};
  line-height: 1;
`;

const ScoreLabel = styled.div`
  font-size: 1rem;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;
`;

const PlagiarismLevel = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${props => props.color};
`;

const ReferenceInfo = styled.p`
  color: var(--gray-600);
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  svg {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary);
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--gray-800);
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 900;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: var(--gray-600);
    font-size: 0.9rem;
  }
`;

const SimilarSentencesCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  margin-bottom: 2rem;
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: var(--warning-gradient);
  color: var(--white);
  padding: 1.5rem 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--gray-50);
  border: none;
  text-align: left;
  font-weight: 600;
  color: var(--gray-800);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background: var(--gray-100);
  }
  
  &.active {
    background: var(--primary);
    color: var(--white);
  }
`;

const AccordionContent = styled(motion.div)`
  padding: 1.5rem;
  background: var(--white);
`;

const SimilarityBadge = styled.span`
  background: var(--warning);
  color: var(--white);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const TextComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextSection = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary);
  }
`;

const HighlightedText = styled.div`
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--gray-700);
`;

const TextContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  margin-bottom: 2rem;
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
`;

const TextContent = styled.div`
  padding: 2rem;
  max-height: 400px;
  overflow-y: auto;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--gray-700);
  background: var(--gray-50);
  border-radius: var(--radius);
  margin: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  
  &.primary {
    background: var(--primary-gradient);
    color: var(--white);
    box-shadow: var(--shadow-lg);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }
  }
  
  &.secondary {
    background: var(--white);
    color: var(--gray-700);
    border: 2px solid var(--gray-200);
    
    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  }
`;

const RecommendationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
`;

const RecommendationHeader = styled.div`
  background: var(--success-gradient);
  color: var(--white);
  padding: 1.5rem 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecommendationBody = styled.div`
  padding: 2rem;
`;

const Alert = styled.div`
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  &.success {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  
  &.warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  &.danger {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TipsSection = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--gray-800);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 0.5rem 0;
    color: var(--gray-600);
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '•';
      color: var(--primary);
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // Simulate result data - in real app, this would come from API
    const mockData = {
      similarityScore: 75,
      plagiarismLevel: 'High Similarity',
      color: '#ef4444',
      inputText: 'This is a sample text that would be analyzed for plagiarism. It contains various sentences and paragraphs that would be compared against reference materials.',
      referenceType: 'academic',
      similarSentences: [
        {
          similarity: 85,
          sentence1: 'This is a sample text that would be analyzed.',
          sentence2: 'This is a sample text that would be analyzed for plagiarism.'
        },
        {
          similarity: 72,
          sentence1: 'It contains various sentences and paragraphs.',
          sentence2: 'It contains various sentences and paragraphs that would be compared.'
        }
      ],
      timestamp: new Date().toLocaleString(),
      wordCount: 25
    };
    
    setResultData(mockData);
  }, []);

  const toggleAccordion = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getRecommendation = (score) => {
    if (score < 10) {
      return {
        type: 'success',
        title: 'Excellent!',
        message: 'Your text shows very low similarity to the reference material. This indicates original content with minimal overlap.',
        icon: <FiCheckCircle />
      };
    } else if (score < 30) {
      return {
        type: 'warning',
        title: 'Good work!',
        message: 'Your text has low similarity. Consider reviewing any highlighted sentences to ensure proper citation if using reference material.',
        icon: <FiInfo />
      };
    } else if (score < 60) {
      return {
        type: 'warning',
        title: 'Moderate similarity detected.',
        message: 'Review the highlighted content and consider rewriting or properly citing the source material.',
        icon: <FiAlertTriangle />
      };
    } else if (score < 80) {
      return {
        type: 'danger',
        title: 'High similarity detected.',
        message: 'Significant portions of your text match the reference material. Consider extensive revision or proper citation.',
        icon: <FiAlertTriangle />
      };
    } else {
      return {
        type: 'danger',
        title: 'Potential plagiarism detected.',
        message: 'Your text shows very high similarity to the reference material. Immediate revision and proper citation are strongly recommended.',
        icon: <FiXCircle />
      };
    }
  };

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const recommendation = getRecommendation(resultData.similarityScore);

  return (
    <ResultContainer>
      <Content>
        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Analysis Results</Title>
          <Timestamp>
            <FiClock />
            Analyzed on {resultData.timestamp}
          </Timestamp>
        </Header>

        <SimilarityCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SimilarityCircle
            color={resultData.color}
            percentage={resultData.similarityScore}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ScoreContent>
              <ScoreNumber color={resultData.color}>
                {resultData.similarityScore}%
              </ScoreNumber>
              <ScoreLabel>Similarity</ScoreLabel>
            </ScoreContent>
          </SimilarityCircle>
          
          <PlagiarismLevel color={resultData.color}>
            {resultData.plagiarismLevel}
          </PlagiarismLevel>
          
          <ReferenceInfo>
            Compared against {resultData.referenceType.replace('_', ' ')} reference text
          </ReferenceInfo>
        </SimilarityCard>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FiFileText />
            <div className="stat-value">{resultData.wordCount}</div>
            <div className="stat-label">Words Analyzed</div>
          </StatCard>
          
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FiAlertTriangle />
            <div className="stat-value">{resultData.similarSentences.length}</div>
            <div className="stat-label">Similar Sentences</div>
          </StatCard>
          
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <FiShield />
            <div className="stat-value">Secure</div>
            <div className="stat-label">Files Deleted</div>
          </StatCard>
        </StatsGrid>

        {resultData.similarSentences.length > 0 && (
          <SimilarSentencesCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CardHeader>
              <FiAlertTriangle />
              Similar Content Detected
            </CardHeader>
            <CardBody>
              <Accordion>
                {resultData.similarSentences.map((sentence, index) => (
                  <AccordionItem key={index}>
                    <AccordionHeader
                      onClick={() => toggleAccordion(index)}
                      className={expandedItems.has(index) ? 'active' : ''}
                    >
                      <div>
                        <SimilarityBadge>{sentence.similarity}%</SimilarityBadge>
                        Similar sentence #{index + 1}
                      </div>
                      <motion.div
                        animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.div>
                    </AccordionHeader>
                    <AnimatePresence>
                      {expandedItems.has(index) && (
                        <AccordionContent
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TextComparison>
                            <TextSection>
                              <h4>Your Text:</h4>
                              <HighlightedText>{sentence.sentence1}</HighlightedText>
                            </TextSection>
                            <TextSection>
                              <h4>Reference Text:</h4>
                              <HighlightedText>{sentence.sentence2}</HighlightedText>
                            </TextSection>
                          </TextComparison>
                        </AccordionContent>
                      )}
                    </AnimatePresence>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardBody>
          </SimilarSentencesCard>
        )}

        <TextContentCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <CardHeader>
            <FiFileText />
            Your Analyzed Text
          </CardHeader>
          <TextContent>{resultData.inputText}</TextContent>
        </TextContentCard>

        <ActionButtons>
          <Button
            className="primary"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft />
            Check Another Text
          </Button>
          <Button
            className="secondary"
            onClick={() => window.print()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPrinter />
            Print Report
          </Button>
        </ActionButtons>

        <RecommendationCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <RecommendationHeader>
            <FiTrendingUp />
            Recommendations
          </RecommendationHeader>
          <RecommendationBody>
            <Alert className={recommendation.type}>
              {recommendation.icon}
              <strong>{recommendation.title}</strong> {recommendation.message}
            </Alert>
            
            <TipsGrid>
              <TipsSection>
                <h4><FiCheckCircle />Tips for Original Writing:</h4>
                <ul>
                  <li>Use your own words and writing style</li>
                  <li>Properly cite all sources</li>
                  <li>Paraphrase instead of copying</li>
                  <li>Add your own analysis and insights</li>
                </ul>
              </TipsSection>
              <TipsSection>
                <h4><FiInfo />Tools to Help:</h4>
                <ul>
                  <li>Use citation generators</li>
                  <li>Check grammar and style</li>
                  <li>Review with peers</li>
                  <li>Use plagiarism checkers regularly</li>
                </ul>
              </TipsSection>
            </TipsGrid>
          </RecommendationBody>
        </RecommendationCard>
      </Content>
    </ResultContainer>
  );
};

export default Result; 