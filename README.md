# 🌍 AI Translation Hub

Una plataforma avanzada de traducción con IA que ofrece múltiples funcionalidades para traducciones precisas y contextuales.

## ✨ Características

- **Traducción Inteligente**: Utiliza OpenAI GPT-3.5 para traducciones precisas
- **Múltiples Idiomas**: Soporte para más de 50 idiomas
- **Detección Automática**: Detecta automáticamente el idioma de origen
- **Contexto Adaptativo**: Diferentes modos de traducción (formal, casual, técnico, etc.)
- **Historial de Traducciones**: Guarda y gestiona traducciones anteriores
- **Estadísticas**: Análisis de uso y rendimiento
- **Seguridad Avanzada**: Rate limiting, validación de entrada, y middleware de seguridad
- **API RESTful**: Endpoints bien documentados y estructurados

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **OpenAI API** (GPT-3.5-turbo)
- **JWT** para autenticación
- **Socket.io** para tiempo real

### Seguridad
- **Helmet** para headers de seguridad
- **CORS** configurado
- **Rate Limiting** por IP y endpoint
- **Validación de entrada** con express-validator
- **Sanitización** de datos

### Frontend (Próximamente)
- **React** + **TypeScript**
- **Tailwind CSS**
- **Socket.io Client**

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- MongoDB
- OpenAI API Key

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd AI-Translation-Hub
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📚 API Endpoints

### Traducción
- `POST /api/translation/translate` - Traducir texto
- `POST /api/translation/translate-multiple` - Traducción múltiple
- `POST /api/translation/detect-language` - Detectar idioma

### Historial y Estadísticas
- `GET /api/translation/history` - Historial de traducciones
- `GET /api/translation/stats` - Estadísticas de uso

### Sistema
- `GET /api/health` - Estado del servidor

## 🔧 Configuración

### Variables de Entorno

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/ai-translation-hub

# OpenAI
OPENAI_API_KEY=tu_api_key_aqui

# Seguridad
JWT_SECRET=tu_jwt_secret_aqui
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🏗️ Arquitectura

```
src/
├── config/          # Configuración de base de datos
├── controllers/     # Lógica de controladores
├── middleware/      # Middleware personalizado
├── models/          # Modelos de MongoDB
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── utils/           # Utilidades
└── server.js        # Punto de entrada
```

## 🔒 Seguridad

- **Rate Limiting**: 100 requests/15min general, 20 requests/15min para traducción
- **Validación**: Sanitización y validación de todos los inputs
- **Headers de Seguridad**: Helmet.js configurado
- **CORS**: Configuración restrictiva
- **Límites de Archivo**: Control de tamaño y tipos

## 📊 Monitoreo

- **Morgan**: Logging de requests
- **Compresión**: Gzip para optimización
- **Health Check**: Endpoint de estado
- **Métricas**: Estadísticas de traducción

## 🚀 Próximas Características

- [ ] Frontend React con TypeScript
- [ ] Autenticación de usuarios
- [ ] Traducción de archivos
- [ ] Chat en tiempo real
- [ ] Dashboard de administración
- [ ] API de desarrolladores
- [ ] Tests automatizados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Sandro Gomez** - [LinkedIn](https://linkedin.com/in/sandrogomez)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!

