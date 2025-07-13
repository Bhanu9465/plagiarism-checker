#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AI Plagiarism Checker - React.js Edition\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js ${nodeVersion.trim()} detected`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 16+ first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log(`✅ npm ${npmVersion.trim()} detected`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

// Check if Python is installed
try {
  const pythonVersion = execSync('python --version', { encoding: 'utf8' });
  console.log(`✅ Python ${pythonVersion.trim()} detected`);
} catch (error) {
  try {
    const python3Version = execSync('python3 --version', { encoding: 'utf8' });
    console.log(`✅ Python ${python3Version.trim()} detected`);
  } catch (error2) {
    console.error('❌ Python is not installed. Please install Python 3.8+ first.');
    process.exit(1);
  }
}

console.log('\n📦 Installing dependencies...\n');

// Install frontend dependencies
console.log('Installing React dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('\nInstalling Python dependencies...');
try {
  execSync('pip install -r requirements.txt', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env file...');
  const envContent = `REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAX_FILE_SIZE=10485760
REACT_APP_SUPPORTED_FORMATS=.txt,.docx,.pdf`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n🚀 To start the application:');
console.log('1. Start the Flask backend: python app.py');
console.log('2. In a new terminal, start React: npm start');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\n📚 For more information, check the README.md file'); 