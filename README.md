# Marvel App

[Marvel App Online](https://marvel-app-rose.vercel.app/)

## Introduction

This project is a React + TypeScript web application that fetches and displays information about Marvel characters. It features a listing page, detailed character view, search functionality, a favorites system, and multilingual support.

## Features

- **Character Listing Page**: Displays the first 50 characters or the search results.
- **Character Search**: Real-time filtering of characters.
- **Favorites System**: Users can add/remove characters from favorites with persistent storage.
- **Character Detail Page**: Shows detailed information and associated comics.
- **Responsive Design**: Fully compatible with mobile and desktop.
- **API Integration**: Fetches data from the [Marvel API](https://developer.marvel.com/).
- **State Management**: Uses Zustand for efficient state handling.
- **Data Fetching & Caching**: Utilizes React Query for optimized API calls.
- **Testing**: Comprehensive unit and integration tests using Vitest and React Testing Library.
- **Internationalization (i18n)**: Supports multiple languages with automatic browser language detection.

## Technologies Used

- **React** (v18+)
- **TypeScript**
- **Zustand** (state management)
- **React Query** (API caching and data fetching)
- **React Router** (navigation)
- **React-i18next** (internationalization)
- **CSS** (custom styles, no UI component libraries)
- **Vitest & React Testing Library** (testing framework)
- **Vite** (modern build tool for performance optimization)

## Setup Instructions

### Prerequisites

- Node.js **>= 18**
- Yarn **(recommended, required for this project)**

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/marpreal/marvel-app.git
   cd marvel-app
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

### Running the Development Server

```sh
yarn dev
```

The app will be available at `http://localhost:5173`.

### Running Tests

```sh
yarn test
```

### Running Coverage Tests

```sh
yarn test --coverage
```

### Building for Production

```sh
yarn build
```

This generates a production-ready build in the `dist/` directory.

### Running Production Build Locally

```sh
yarn build && yarn preview
```

This serves the built app locally to test the production mode.

## Internationalization (i18n)

The app now supports **automatic language detection** and **manual language switching** using `react-i18next`. It defaults to English, but if the browser is set to Spanish, it switches automatically.

## Project Structure

```
marvel-app/
│── src/
│   ├── api/                # API configuration and setup
│   ├── services/           # API service functions using React Query
│   ├── components/         # Reusable UI Components
│   ├── pages/              # Page views for different routes
│   ├── store/              # Zustand state management
│   ├── styles/             # Global and modular styles
│   ├── types/              # TypeScript type definitions
│   ├── locales/            # i18n JSON translation files
│   ├── i18n.ts             # i18n setup and initialization
│   ├── tests/              # Unit & integration tests
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # ReactDOM render entry point
│── public/                 # Static assets and index.html
│── .eslintrc.js            # ESLint configuration
│── vite.config.ts          # Vite configuration
│── package.json            # Dependencies and scripts
│── README.md               # Documentation
```

## API Usage

The application uses the Marvel API:

- **Base URL**: `http://gateway.marvel.com/v1/`
- **API Key setup**: [Marvel API Documentation](https://developer.marvel.com/documentation/getting_started)

## Deployment

### Local Preview of Production Build

```sh
yarn build && yarn preview
```

### Deployment to Vercel

```sh
vercel deploy
```

## Contact

For any questions, reach out to:

- **Marta Pretel Albarrán**: marpreal97@gmail.com
