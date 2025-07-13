# 🚀 AI-Powered Plagiarism Checker - React.js Edition

A stunning, modern plagiarism detection application built with React.js, featuring advanced AI algorithms, beautiful UI/UX, and real-time text analysis.

![Plagiarism Checker](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Styled Components](https://img.shields.io/badge/Styled--Components-6.0.0-ff69b4?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-10.12.16-0055ff?style=for-the-badge)

## ✨ Features

### 🎨 **God Mode Styling**
- **Poppins Font** throughout the entire application
- **Modern Gradient Backgrounds** with stunning color schemes
- **Glassmorphism Effects** with backdrop blur and transparency
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** that looks perfect on all devices
- **Dark/Light Theme Support** with CSS custom properties

### 🤖 **Advanced AI Technology**
- **TF-IDF Vectorization** for intelligent text analysis
- **Cosine Similarity Algorithms** for accurate similarity detection
- **Sentence-Level Analysis** to identify specific matches
- **Multiple Reference Categories** (Academic, Creative, Technical, Business)
- **Real-time Processing** with instant results

### 📁 **File Support**
- **Drag & Drop Upload** with visual feedback
- **Multiple Formats**: TXT, DOCX, PDF
- **File Size Validation** (up to 10MB)
- **Automatic File Cleanup** for privacy

### 📊 **Comprehensive Reports**
- **Visual Similarity Circle** with animated progress
- **Detailed Statistics** and metrics
- **Highlighted Matches** with side-by-side comparison
- **Recommendations** based on similarity scores
- **Export & Print** functionality

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM 6.3.0** - Client-side routing
- **Styled Components 6.0.0** - CSS-in-JS styling
- **Framer Motion 10.12.16** - Smooth animations and transitions
- **React Icons 4.10.1** - Beautiful icon library
- **React Dropzone 14.2.3** - Drag & drop file uploads

### Backend (Flask API)
- **Flask** - Python web framework
- **NLTK** - Natural language processing
- **Scikit-learn** - Machine learning algorithms
- **Python-docx** - DOCX file processing
- **PyPDF2** - PDF file processing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Python 3.8+ (for Flask backend)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/plagiarism-checker-react.git
cd plagiarism-checker-react
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
pip install -r requirements.txt
```

4. **Start the Flask backend**
```bash
python app.py
```

5. **Start the React development server**
```bash
npm start
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
plagiarism-checker-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Stunning navigation with glassmorphism
│   │   ├── Footer.js          # Modern footer with social links
│   │   └── PlagiarismForm.js  # Advanced form with drag & drop
│   ├── pages/
│   │   ├── Home.js            # Hero section with feature cards
│   │   ├── Result.js          # Detailed analysis results
│   │   └── About.js           # Information about the platform
│   ├── styles/
│   │   └── GlobalStyles.js    # Global CSS with Poppins font
│   ├── App.js                 # Main app with routing
│   └── index.js               # React entry point
├── app.py                     # Flask backend API
├── requirements.txt           # Python dependencies
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary: #6366f1;
--primary-dark: #4f46e5;
--secondary: #8b5cf6;

/* Gradients */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--danger: #ef4444;
```

### Typography
- **Font Family**: Poppins (300, 400, 500, 600, 700, 800, 900)
- **Base Font Size**: 16px
- **Line Height**: 1.6

### Spacing & Layout
- **Border Radius**: 0.375rem to 2rem
- **Shadows**: 5 levels (sm, md, lg, xl, 2xl)
- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAX_FILE_SIZE=10485760
REACT_APP_SUPPORTED_FORMATS=.txt,.docx,.pdf
```

### Customization
Modify the design system in `src/styles/GlobalStyles.js`:

```javascript
:root {
  /* Customize colors */
  --primary: #your-color;
  --primary-gradient: linear-gradient(135deg, #your-gradient);
  
  /* Customize fonts */
  --font-family: 'Your-Font', sans-serif;
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

### Page Transitions
- Fade in/out with slide effects
- Staggered animations for content
- Smooth hover states

### Interactive Elements
- Button hover effects with scale
- Card lift animations
- Loading spinners
- Progress indicators

## 🔒 Security Features

- **File Validation**: Type and size checking
- **Automatic Cleanup**: Files deleted after processing
- **Input Sanitization**: XSS protection
- **CORS Configuration**: Secure API access

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Heroku/DigitalOcean)
```bash
pip install -r requirements.txt
gunicorn app:app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Poppins Font** by Google Fonts
- **React Icons** for beautiful icons
- **Framer Motion** for smooth animations
- **Styled Components** for modern styling

## 📞 Support

- **Email**: support@plagiarism-checker.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/plagiarism-checker-react/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/plagiarism-checker-react/wiki)

---

<div align="center">
  <p>Made with ❤️ and ☕ by the Plagiarism Checker Team</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div> 