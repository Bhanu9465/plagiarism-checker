import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiBrain, 
  FiTrendingUp, 
  FiUsers, 
  FiAward,
  FiCode,
  FiDatabase,
  FiZap
} from 'react-icons/fi';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled(motion.section)`
  text-align: center;
  color: var(--white);
  padding: 4rem 0;
`;

const Title = styled.h1`
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

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  margin: 2rem 0;
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

const SectionContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray-700);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  color: var(--white);
  
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  color: var(--white);
  
  .stat-number {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const TechItem = styled(motion.div)`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  
  svg {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }
  
  h4 {
    font-weight: 600;
    color: var(--gray-800);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--gray-600);
  }
`;

const About = () => {
  const features = [
    {
      icon: <FiBrain />,
      title: 'Advanced AI',
      description: 'State-of-the-art machine learning algorithms for accurate text analysis'
    },
    {
      icon: <FiShield />,
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after processing for complete privacy'
    },
    {
      icon: <FiTrendingUp />,
      title: 'High Accuracy',
      description: 'Advanced TF-IDF and cosine similarity algorithms for precise results'
    },
    {
      icon: <FiUsers />,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for students, writers, and professionals'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Accuracy Rate' },
    { number: '10K+', label: 'Documents Analyzed' },
    { number: '50+', label: 'Supported Languages' },
    { number: '24/7', label: 'Available' }
  ];

  const techStack = [
    { icon: <FiCode />, name: 'React.js', desc: 'Frontend Framework' },
    { icon: <FiDatabase />, name: 'Flask', desc: 'Backend API' },
    { icon: <FiBrain />, name: 'Python', desc: 'ML Algorithms' },
    { icon: <FiZap />, name: 'NLTK', desc: 'Text Processing' }
  ];

  return (
    <AboutContainer>
      <Content>
        <HeroSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>About Our Platform</Title>
          <Subtitle>
            We're revolutionizing plagiarism detection with cutting-edge AI technology. 
            Our platform combines advanced machine learning algorithms with a user-friendly 
            interface to provide accurate, reliable text similarity analysis.
          </Subtitle>
        </HeroSection>

        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>Our Mission</SectionTitle>
          <SectionContent>
            <p>
              Our mission is to promote academic integrity and original writing by providing 
              educators, students, and professionals with a powerful, easy-to-use plagiarism 
              detection tool. We believe that technology should enhance learning and creativity, 
              not hinder it.
            </p>
            <p>
              By leveraging the latest advances in natural language processing and machine learning, 
              we've created a platform that not only detects similarities but also helps users 
              understand and improve their writing practices.
            </p>
          </SectionContent>
        </Card>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>How It Works</SectionTitle>
          <SectionContent>
            <p>
              Our plagiarism detection system uses a sophisticated approach combining multiple 
              techniques to ensure accurate results:
            </p>
            <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
              <li><strong>Text Preprocessing:</strong> We clean and normalize your text, removing 
              common words and standardizing formatting.</li>
              <li><strong>TF-IDF Vectorization:</strong> We convert text into numerical vectors 
              that capture the importance of words in context.</li>
              <li><strong>Cosine Similarity:</strong> We calculate the similarity between your 
              text and reference materials using advanced mathematical algorithms.</li>
              <li><strong>Sentence-Level Analysis:</strong> We identify specific sentences that 
              may need attention or proper citation.</li>
            </ul>
          </SectionContent>
        </Card>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </StatCard>
          ))}
        </StatsGrid>

        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>Technology Stack</SectionTitle>
          <TechStack>
            {techStack.map((tech, index) => (
              <TechItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech.icon}
                <h4>{tech.name}</h4>
                <p>{tech.desc}</p>
              </TechItem>
            ))}
          </TechStack>
        </Card>

        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <SectionTitle>Privacy & Security</SectionTitle>
          <SectionContent>
            <p>
              We take your privacy and security seriously. All uploaded files are automatically 
              deleted from our servers after processing, ensuring your content remains confidential. 
              We use industry-standard encryption and security measures to protect your data.
            </p>
            <p>
              Our platform complies with data protection regulations and is designed with privacy 
              by design principles. You can trust that your academic work and personal information 
              are safe with us.
            </p>
          </SectionContent>
        </Card>

        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <SectionTitle>Get Started Today</SectionTitle>
          <SectionContent style={{ textAlign: 'center' }}>
            <p>
              Ready to experience the future of plagiarism detection? Start using our platform 
              today and discover how AI can help you maintain academic integrity and improve 
              your writing.
            </p>
            <motion.button
              style={{
                background: 'var(--primary-gradient)',
                color: 'var(--white)',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '2rem',
                boxShadow: 'var(--shadow-lg)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
            >
              <FiAward style={{ marginRight: '0.5rem' }} />
              Start Checking Now
            </motion.button>
          </SectionContent>
        </Card>
      </Content>
    </AboutContainer>
  );
};

export default About; 