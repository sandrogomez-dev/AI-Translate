# 🚀 AI Translation Hub - Development Guide

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (local or cloud)
- OpenAI API Key

### Setup

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd AI-Translation-Hub
npm run install:all
```

2. **Configure environment**
```bash
cp env.example .env
# Edit .env with your configurations
```

3. **Start development servers**
```bash
# Option 1: Start both backend and frontend
npm run dev:full

# Option 2: Start separately
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend  
npm run dev:client
```

## 🏗️ Project Structure

```
AI-Translation-Hub/
├── src/                    # Backend source code
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── server.js         # Main server file
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main app component
│   └── public/           # Static assets
└── docs/                 # Documentation
```

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend server |
| `npm run dev:client` | Start React frontend |
| `npm run dev:full` | Start both servers |
| `npm run build` | Build for production |
| `npm run setup` | Full setup (install + build) |

## 🌐 API Endpoints

### Translation
- `POST /api/translation/translate` - Single translation
- `POST /api/translation/translate-multiple` - Multiple languages
- `POST /api/translation/detect-language` - Language detection

### Data
- `GET /api/translation/history` - Translation history
- `GET /api/translation/stats` - Usage statistics

### System
- `GET /api/health` - Server health check

## 🔒 Security Features

- **Rate Limiting**: 100 req/15min general, 20 req/15min translation
- **Input Validation**: Sanitization and validation
- **Security Headers**: Helmet.js configuration
- **CORS**: Restrictive cross-origin policy
- **File Upload Limits**: Size and type restrictions

## 🎨 Frontend Features

- **Modern UI**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety
- **Responsive**: Mobile-first design
- **Real-time**: Live translation updates
- **History**: Translation history with search
- **Analytics**: Performance metrics and statistics

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ai-translation-hub
OPENAI_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
```

## 📊 Monitoring

- **Health Check**: `/api/health`
- **Logging**: Morgan HTTP logger
- **Error Handling**: Global error middleware
- **Performance**: Processing time tracking

## 🧪 Testing

```bash
# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env

2. **OpenAI API Error**
   - Verify OPENAI_API_KEY is correct
   - Check API quota and billing

3. **CORS Issues**
   - Update CORS_ORIGIN in .env
   - Check frontend URL matches backend config

4. **Rate Limiting**
   - Wait for rate limit window to reset
   - Adjust limits in .env if needed

## 📞 Support

For issues and questions:
- Create GitHub issue
- Check documentation
- Review error logs

---

**Happy Coding! 🎉**
