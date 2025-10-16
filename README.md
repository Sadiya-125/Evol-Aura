# Evol Aura - AI-Powered Jewelry Stylist Kiosk

An innovative AI-powered interactive jewellery stylist kiosk built on a 55-inch touchscreen mirror, designed to revolutionize the jewelry shopping experience by providing personalized recommendations through conversational AI and virtual try-on technology.

## 🎯 Problem Understanding

Jewelry shopping often overwhelms customers with too many choices, limited personalization, and difficulty visualizing styles. The kiosk solves this by acting as a personal stylist that understands customer preferences, aligns them with celebrity inspirations, and provides tailored jewelry recommendations instantly in-store.

## 🚀 Proposed Solution

We propose an AI-powered interactive jewellery stylist kiosk built on a 55-inch touchscreen mirror. Customers engage in a dynamic conversational survey about style, occasions, and budget.

The kiosk will display:

- **Celebrity match results** (e.g., "Your style matches Deepika Padukone")
- **Visual inspiration boards** of jewellery look
- **Personalized Evol Jewels product suggestions** with smart filters (budget, style, occasion)

Our unique twist is a **"Trend Lens"** feature: the kiosk highlights emerging jewellery trends by analysing real-time social media content, giving Evol Jewels an edge as a trendsetter.

We also plan **multilingual support** (English, Hindi) for inclusivity in Indian retail spaces.

## ✨ Key Features

- **Conversational, adaptive survey** (voice + touch interaction)
- **Celebrity AI analysis** with vibe-based clustering (minimal, bold, modern, traditional)
- **Personalized recommendation engine** with product filters
- **Wishlist Shortlist** - customers can save favourites directly on the kiosk
- **AI Trend Forecasting Dashboard** - business insights for Evol Jewels
- **Bonus features**: Trend Lens, multilingual support, accessibility (text size control)

## 🏗️ Technical Approach

- **Recommendation Engine**: Hybrid filtering (survey responses + celebrity match + inventory metadata)
- **Tech Stack**: Python (AI), TensorFlow/PyTorch (try on matching), Node.js backend, React-based kiosk UI
- **Optimization**: Designed for 55-inch vertical touchscreen, smooth mirror overlay visuals

## 🛠️ Tech Stack

### Backend (Virtual Try-On)

- **Python** - Core AI/ML functionality
- **Diffusers** - Stable Diffusion for image generation and inpainting
- **OpenCV** - Computer vision for image processing
- **Mediapipe** - Facial and hand tracking
- **Gradio** - Web interface for try-on functionality
- **Docker** - Containerization for deployment

### Frontend (Kiosk Interface)

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Supabase** - Backend-as-a-Service for data management
- **Lucide React** - Beautiful icons

### Key Technologies

- **AI/ML**: Diffusers, OpenCV, Mediapipe, CVZone, xFormers
- **Web**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI, Gradio, Docker
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Docker, GitHub Actions

## 📁 Project Structure

```
Evol Aura/
├── backend/                          # Python AI backend
│   ├── src/
│   │   ├── components/
│   │   │   ├── clothingTryOn.py      # Clothing try-on logic
│   │   │   └── necklaceTryOn.py      # Necklace try-on logic
│   │   ├── pipelines/
│   │   │   └── completePipeline.py   # Main processing pipeline
│   │   └── utils/
│   │       ├── exceptions.py         # Custom exceptions
│   │       ├── functions.py          # Utility functions
│   │       └── logger.py             # Logging setup
│   ├── demo/                         # Demo images
│   ├── app.py                        # Main Gradio application
│   ├── config.ini                    # Configuration settings
│   ├── requirements.txt              # Python dependencies
│   ├── Dockerfile                    # Docker configuration
│   └── README.md                     # Backend documentation
├── frontend/                         # React kiosk interface
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── IdleScreen.tsx        # Idle state screen
│   │   │   ├── WelcomeScreen.tsx     # Welcome screen
│   │   │   ├── SurveyScreen.tsx      # Interactive survey
│   │   │   ├── TrendFeed.tsx         # Trend display
│   │   │   ├── StyleMatchScreen.tsx  # Celebrity matching
│   │   │   ├── ProductsScreen.tsx    # Product recommendations
│   │   │   ├── WishlistScreen.tsx    # Wishlist management
│   │   │   └── AdminDashboard.tsx    # Analytics dashboard
│   │   ├── data/                     # Mock data and trends
│   │   │   ├── mockData.ts           # Product and celebrity data
│   │   │   └── trendData.ts          # Trend analytics
│   │   ├── types/                    # TypeScript definitions
│   │   ├── utils/                    # Utility functions
│   │   │   ├── translations.ts       # Multilingual support
│   │   │   └── productFilter.ts      # Product filtering logic
│   │   └── App.tsx                   # Main application component
│   ├── public/                       # Static assets
│   │   ├── celebrity-images/         # Celebrity photos
│   │   ├── products/                 # Product images
│   │   └── trending/                 # Trend images
│   ├── package.json                  # Node dependencies
│   ├── vite.config.ts                # Vite configuration
│   └── tailwind.config.js            # Tailwind configuration
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Docker** (optional, for containerized deployment)
- **Git**

### Backend Setup (Virtual Try-On)

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**

   - Edit `config.ini` for device settings (CPU/CUDA)
   - Set up environment variables for Appwrite (if using cloud storage)

4. **Run the backend:**

   ```bash
   python app.py
   ```

   The Gradio interface will be available at `http://localhost:7860`

### Frontend Setup (Kiosk Interface)

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The kiosk interface will be available at `http://localhost:5173`

### Docker Deployment (Optional)

For the backend:

```bash
cd backend
docker build -t evol-aura-backend .
docker run -p 7860:7860 evol-aura-backend
```

## 🎮 Usage

### Kiosk Flow

1. **Idle Screen**: Touch to start or say "Hello Aura"
2. **Welcome**: Privacy notice and language selection
3. **Trend Feed**: Browse trending celebrity styles
4. **Survey**: Interactive questions about style preferences
5. **Style Match**: Celebrity vibe matching results
6. **Products**: Personalized jewelry recommendations
7. **Wishlist**: Save favorites and request store assistant

### Admin Dashboard

Access admin features by pressing `Alt + A` on the idle screen:

- View trend analytics
- Monitor conversion rates
- Track celebrity preferences
- Analyze customer behavior

## 🌟 Features in Detail

### Conversational Survey

- Touch and voice interaction
- Adaptive questions based on responses
- Multilingual support (English/Hindi)

### Celebrity Matching

- Vibe-based clustering (minimal, bold, modern, traditional)
- Visual inspiration from celebrity styles
- Personalized recommendations

### Trend Lens

- Real-time social media trend analysis
- Emerging jewelry trend forecasting
- Business intelligence dashboard

### Accessibility

- Text size controls (Ctrl + + / Ctrl + -)
- High contrast mode
- Reduced motion options

## 📊 Analytics & Insights

The admin dashboard provides:

- **Weekly Statistics**: Sessions, conversion rates, wishlist metrics
- **Style Trends**: Popular preferences over time
- **Celebrity Trends**: Top inspirational figures
- **Conversion Funnel**: User journey analytics
- **Business Insights**: Actionable recommendations

## 🔧 Configuration

### Backend Configuration (`backend/config.ini`)

```ini
[CLOTHING TRY ON]
device = cuda  # or cpu
modelId = stabilityai/stable-diffusion-2-inpainting

[NECKLACE TRY ON]
offsetFactor = 0.8

[WEBSERVER]
host = 0.0.0.0
port = 7860
```

### Environment Variables

```bash
# For Supabase (Frontend)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# For Appwrite (Backend - optional)
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_BUCKET_ID=your_bucket_id
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint code quality
```

### Backend Testing

```bash
cd backend
python -m pytest    # Run tests (if implemented)
```

## 🚀 Deployment

### Production Build (Frontend)

```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

### Docker Deployment

```bash
# Backend
cd backend
docker build -t evol-aura-backend .
docker run -p 7860:7860 evol-aura-backend

# Frontend (static hosting)
cd frontend
npm run build
# Serve dist/ folder on your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Evol Aura Team**

- **Team Name**: Evol Aura
- **Team Members**: Sadiya Maheen Siddiqui (Full Stack Developer and AI Engineer)

## 📞 Contact

- **Email**: adibasadiya9502@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/sadiya-maheen-siddiqui/
- **GitHub**: https://github.com/Sadiya-125

## 🙏 Acknowledgments

- **Fueled Contest 3.0** for the opportunity
- **Evol Jewels** for the inspiring challenge
- Open source community for amazing AI/ML tools
- React, TypeScript, and Python communities

**Made with ❤️ for Fueled Contest 3.0**
