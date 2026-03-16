# 🌦️ Weather Dashboard

A modern, high-performance weather application built with **Vue 3**, **Vite**, and **OpenWeatherMap API**. This application provides a sleek and intuitive interface for checking weather forecasts, featuring real-time data fetching and a responsive design.

🔗 **Live Demo:** [weather-app-gilt-gamma-77.vercel.app](https://weather-app-gilt-gamma-77.vercel.app/)

---

## ✨ Features

- **Real-time Forecasts:** Accurate 5-day weather data using the OpenWeatherMap API.
- **Location Search:** Easily search and find weather for thousands of cities worldwide.
- **Rich Visuals:** Dynamic UI components powered by Vuetify 4 and Tailwind CSS 4.
- **Performance Optimized:** Built with Vite for lightning-fast HMR and an efficient production bundle.
- **Type-Safe:** Fully implemented with TypeScript and Zod for API data validation.
- **Seamless State Management:** Leverages TanStack Vue Query for caching and synchronizing server state.

## 🛠️ Technology Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Tooling:** [Vite](https://vitejs.dev/)
- **UI & Styling:** 
  - [Vuetify 4](https://vuetifyjs.com/) (Material Design Components)
  - [Tailwind CSS 4](https://tailwindcss.com/) (Modern Utility-First CSS)
  - [Sass](https://sass-lang.com/) (Advanced Styling)
- **Data Fetching:** [TanStack Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview)
- **Navigation:** [Vue Router](https://router.vuejs.org/)
- **Validation:** [Zod](https://zod.dev/)
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/MNakhla/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

- `src/components`: Reusable Vue components (Dashboard, Search, Forecasts).
- `src/composables`: Reusable logic for weather fetching and state.
- `src/services`: API service layer for external communication.
- `src/types`: TypeScript interfaces and Zod schemas.
- `src/styles`: Global styles, Tailwind imports, and Vuetify settings.
- `public/`: Static assets including a large city database in CSV format.

---

## 📜 License
This project is for demonstration purposes. Developed by [MNakhla](https://github.com/MNakhla).