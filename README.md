# 🌤️ App 2 – Weather App
### React + TypeScript + Material UI (MUI) + External API

---

## What This App Does
A live weather app where you can:
- Pick a city from a dropdown
- Click **Get Weather** — this triggers a real API call
- See the current temperature, wind speed and weather condition
- Fully responsive — works on mobile and desktop

Uses **Open-Meteo** — a completely free weather API, no account or API key needed.

---

## ⚡ Setup From Scratch (Step by Step)

### Step 1 — Make sure you have Node.js installed
```bash
node --version    # needs v16 or higher
npm --version     # needs v8 or higher
```
Download from https://nodejs.org if missing (choose LTS).

---

### Step 2 — Create a brand new React + TypeScript project
```bash
npx create-react-app app2-weather --template typescript
```
This sets up a working React app with TypeScript in a folder called `app2-weather`.

---

### Step 3 — Go into the project folder
```bash
cd app2-weather
```

---

### Step 4 — Install MUI (Material UI)
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```
This installs four packages (explained in package.json section below).

---

### Step 5 — Copy in the project files
Replace/create files in `src/` with the ones provided:
```
src/
├── App.tsx
├── index.tsx
├── types.ts
├── components/
│   ├── WeatherCard.tsx
│   └── CitySelector.tsx
└── utils/
    └── weatherUtils.ts
```

---

### Step 6 — Start the app
```bash
npm start
```
Browser opens at **http://localhost:3000** 🎉

---

## 📦 package.json Explained

```json
{
  "name": "app2-weather-mui",
  "version": "1.0.0",
  "private": true,
```
| Field | What it means |
|-------|--------------|
| `name` | The project name — just a label |
| `version` | Start at 1.0.0, increase when you release updates |
| `private: true` | Prevents accidental publishing to the public npm registry |

---

```json
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@mui/material": "^5.14.0",
    "@mui/icons-material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0"
  }
```
**dependencies** = needed to RUN the app

| Package | What it does |
|---------|-------------|
| `react` | The React library |
| `react-dom` | Connects React to the browser |
| `react-scripts` | Powers `npm start` and `npm run build` |
| `typescript` | TypeScript language support |
| `@types/react` | TypeScript types for React |
| `@types/react-dom` | TypeScript types for react-dom |
| `@mui/material` | All the MUI components: Button, Card, Typography, etc. |
| `@mui/icons-material` | Icon library (SearchIcon, CloudIcon, etc.) |
| `@emotion/react` | MUI's CSS-in-JS engine (required by MUI) |
| `@emotion/styled` | Lets MUI use the `styled()` function internally |

> **Why do we need @emotion?**
> MUI does not use a CSS file like Tailwind does. Instead it generates CSS from JavaScript at runtime. Emotion is the library that does this behind the scenes. You don't write Emotion code yourself — MUI uses it automatically.

---

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
```
| Command | What it does |
|---------|-------------|
| `npm start` | Starts dev server at localhost:3000 with live reload |
| `npm run build` | Creates a production-ready build in the `/build` folder |

---

## 🗂️ Full File Structure Explained

```
app2-mui/
│
├── public/
│   └── index.html               ← The one HTML page, React renders into <div id="root">
│
├── src/
│   ├── types.ts                 ← TypeScript interface for WeatherData shape
│   │
│   ├── utils/
│   │   └── weatherUtils.ts      ← Helper functions: convert weather codes → text/emoji
│   │                               Also holds the list of cities with coordinates
│   │
│   ├── components/
│   │   ├── WeatherCard.tsx      ← Shows weather data using MUI Card, Typography, Chip
│   │   └── CitySelector.tsx     ← Dropdown + button using MUI Select and Button
│   │
│   ├── App.tsx                  ← Main component: fetch logic, useState, useEffect
│   └── index.tsx                ← Entry point: mounts App into HTML
│
├── tsconfig.json                ← TypeScript compiler settings
└── package.json                 ← Project config and dependencies
```

---

## 🧠 Key Concepts in This App

### How the API Fetch Works (step by step)

```
1. Page loads → useEffect runs fetchWeather() automatically
2. User picks a city from dropdown → selectedCity state updates
3. User clicks "Get Weather" button → onSearch() is called
4. fetchWeather() runs:
     a. setLoading(true)     → spinner appears
     b. fetch(url)           → sends HTTP GET to Open-Meteo
     c. response.json()      → converts response to JavaScript object
     d. setWeather(data)     → stores result, triggers re-render
     e. setLoading(false)    → spinner disappears
5. If anything goes wrong → setError("message") → Alert shows
```

### The fetch() call
```typescript
const url = `https://api.open-meteo.com/v1/forecast
  ?latitude=59.33
  &longitude=18.07
  &current_weather=true`

const response = await fetch(url)          // send the request
const data     = await response.json()     // read the response body as JSON
// data.current_weather.temperature → the temperature number
```

### useState in this app
```typescript
// Each piece of state has a clear TypeScript type
const [selectedCity, setSelectedCity] = useState<string>("Stockholm")
// string → the city name

const [weather, setWeather] = useState<WeatherData | null>(null)
// WeatherData | null → either we have data, or we don't yet

const [loading, setLoading] = useState<boolean>(false)
// boolean → is the fetch in progress?

const [error, setError] = useState<string>("")
// string → empty means no error, otherwise show the message
```

### useEffect in this app
```typescript
useEffect(() => {
  fetchWeather()   // auto-fetch when the page first loads
}, [])             // [] means: run only ONCE, on first render

// If you wrote [selectedCity] instead of []:
// It would re-fetch automatically whenever the city changes
```

---

## 🎨 How MUI Styling Works

MUI has two main ways to style components:

### 1. Props — built-in style options on each component
```tsx
<Button
  variant="contained"    // filled solid button (vs "outlined" or "text")
  size="large"           // controls padding and font size
  color="primary"        // uses theme colour
  disabled={loading}     // greys out when true
  startIcon={<SearchIcon />}  // icon before the label text
>
```

```tsx
<Card elevation={4}>    // 0 = no shadow, 24 = very heavy shadow
<Typography variant="h4">   // controls font size: h1–h6, body1, caption...
<Container maxWidth="sm">   // limits width: xs, sm, md, lg, xl
```

### 2. sx prop — custom CSS using the MUI theme system
```tsx
<Box sx={{
  // Spacing: 1 unit = 8px
  p: 3,           // padding: 24px (3 × 8)
  mb: 2,          // margin-bottom: 16px
  gap: 2,         // gap between children: 16px

  // Any CSS property in camelCase
  backgroundColor: "rgba(255,255,255,0.2)",
  fontWeight: 700,
  borderRadius: 3,

  // Pseudo-classes
  "&:hover": {
    backgroundColor: "#1e3a5f",
  },

  // RESPONSIVE — object with breakpoint keys
  fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
  //          ↑ mobile      ↑ tablet    ↑ desktop
  flexDirection: { xs: "column", sm: "row" },
}}>
```

### Responsive design with MUI
```tsx
// Container automatically limits and centres content
<Container maxWidth="sm">    // max width ~600px, centred

// Box goes column on mobile, row on tablet+
<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>

// Typography font size shrinks on small screens
<Typography sx={{ fontSize: { xs: "2rem", sm: "4rem" } }}>
```

---

## 🔁 Practice Ideas

1. **Show more weather data** — add humidity, UV index (check Open-Meteo docs for extra params)
2. **Add a forecast** — fetch `hourly=temperature_2m` and display a table of hourly temps
3. **Change the card theme** — modify the gradient in `WeatherCard.tsx` using sx prop
4. **Add your own city** — add an entry to the `CITIES` array in `weatherUtils.ts`
5. **Add a custom MUI theme** — use `createTheme()` to set global brand colours and fonts
6. **Show a background image based on weather** — sunny = beach photo, rainy = rain photo

---

## 🐛 Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| `npm start` fails | Make sure you're inside the project folder |
| MUI components show red underlines | Run `npm install` to install all packages |
| API fetch fails | Check your internet connection; Open-Meteo is free but needs network |
| Spinner never stops | Check console for errors — likely a fetch or JSON parse error |
| Layout broken on mobile | Use `{ xs: ..., sm: ... }` responsive values in sx prop |

---

## 🔍 How to Inspect API Responses

1. Open DevTools (F12) in Chrome
2. Click the **Network** tab
3. Click "Get Weather" in the app
4. Find the request to `api.open-meteo.com`
5. Click it → **Response** tab to see the raw JSON the API returns

This is how you discover what data is available to display!

---

## Differences: App 1 (Tailwind) vs App 2 (MUI)

| | App 1 – Tailwind | App 2 – MUI |
|---|---|---|
| **Styling approach** | Utility classes in className | sx prop + component props |
| **Config file** | `tailwind.config.js` with theme extensions | `createTheme()` or sx inline |
| **Responsive design** | `md:grid-cols-2`, `sm:text-lg` | `{ xs: "column", sm: "row" }` |
| **Data source** | localStorage (browser storage) | Open-Meteo external API |
| **Data trigger** | Form submit on button click | Button click → async fetch |
| **Pre-built components** | No (you build everything) | Yes (Card, Button, Select, etc.) |
| **CSS output** | Static utility classes | Dynamic CSS-in-JS via Emotion |
